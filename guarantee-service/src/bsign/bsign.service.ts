import { Inject, Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import * as FormData from 'form-data';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { PdfGeneratorService } from 'src/pdf-generator/pdf-generator.service';

@Injectable()
export class BsignService {
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App,
    private configService: ConfigService,
    private prisma: PrismaService,
    private pdfGeneratorService: PdfGeneratorService,
  ) {}
  private readonly baseURL: string =
    'https://staging-credentials-manager.bsign.app/api/sign/p12/pdf/sign-visible-with-image';

  async signGuarantee(payload: {
    id: string;
    data: {
      accountId: string;
      placeholder: string;
      pdfFilePath: string;
      signatureImageURL: string;
    };
  }): Promise<any> {
    const { id, data } = payload;
    const formData = new FormData();
    const token = this.configService.get<string>('BSIGN_AUTHENTICATION_TOKEN');

    const correctPath = data.pdfFilePath
      .replace('https://storage.googleapis.com/datn-1cf0a.appspot.com/', '')
      .replace(/%2F/g, '/');
    const bucket = this.firebaseAdmin.storage().bucket();
    const file = bucket.file(correctPath);
    const [buffer] = await file.download();

    formData.append('accountId', data.accountId);
    formData.append('placeholder', data.placeholder);
    formData.append('signatureImageURL', data.signatureImageURL);
    formData.append('pdfFile', buffer, {
      filename: 'document.pdf',
      contentType: 'application/pdf',
    });

    const headers = {
      ...formData.getHeaders(),
      Authorization: `Bearer ${token}`,
    };
    try {
      const response: AxiosResponse = await axios.post(
        `${this.baseURL}`,
        formData,
        { headers, responseType: 'arraybuffer' },
      );

      const guarantee = await this.prisma.guarantee.findUnique({
        where: {
          guarantee_id: Number(id),
        },
      });

      const { guarantee_id, applicant_detail_id, beneficiary_detail_id } =
        guarantee;
      const fileName = `guarantee-documents/${guarantee_id}-${applicant_detail_id}-${beneficiary_detail_id}.pdf`;
      const mimeType = 'application/pdf';
      const publicUrl = await this.pdfGeneratorService.uploadBuffer(
        response.data,
        fileName,
        mimeType,
      );

      await this.prisma.guarantee.update({
        where: {
          guarantee_id: Number(id),
        },
        data: {
          docURL: publicUrl,
          signatureImg: data.signatureImageURL,
        },
      });
      return publicUrl;
    } catch (error) {
      console.log('Error fetching data:', error);
      throw error;
    }
  }
}
