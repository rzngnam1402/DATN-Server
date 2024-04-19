import { Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as pdf from 'pdf-creator-node';
import * as path from 'path';
import * as admin from 'firebase-admin';
import { PDF_OPTIONS } from './configs/option.config';
import { PrismaService } from 'src/prisma/prisma.service';
import { formatMoney, readMoney } from 'src/utils/money.utils';
import { readDate } from 'src/utils/date.utils';

@Injectable()
export class PdfGeneratorService {
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App,
    private prisma: PrismaService,
  ) {}

  async genGuaranteeDoc(id: string) {
    const guarantee = await this.prisma.guarantee.findUnique({
      where: {
        applicant_detail_id: id,
      },
      include: {
        ApplicantDetail: true,
        BeneficiaryDetail: true,
      },
    });
    const {
      guarantee_id,
      applicant_detail_id,
      beneficiary_detail_id,
      bankName,
      amount,
      currency,
      startDate,
      expiryDate,
      docURL,
      ApplicantDetail,
      BeneficiaryDetail,
    } = guarantee;
    ApplicantDetail.businessName = ApplicantDetail.businessName.toUpperCase();
    BeneficiaryDetail.businessName =
      BeneficiaryDetail.businessName.toUpperCase();

    const html = fs.readFileSync(
      path.join(process.cwd(), './src/pdf-generator/templates/template.html'),
      'utf-8',
    );
    const document = {
      html: html,
      data: {
        guarantee_id,
        applicant_detail_id,
        beneficiary_detail_id,
        bankName,
        amount: formatMoney(amount),
        moneyText: readMoney(Number(amount), currency),
        currency,
        startDate: readDate(startDate),
        expiryDate: readDate(expiryDate),
        docURL,
        ApplicantDetail,
        BeneficiaryDetail,
      },
      type: 'buffer',
    };

    const pdfBuffer = await pdf.create(document, PDF_OPTIONS);
    const fileName = `guarantee-documents/${guarantee_id}-${applicant_detail_id}-${beneficiary_detail_id}.pdf`;
    const fileRef = this.firebaseAdmin.storage().bucket().file(fileName);
    await fileRef.save(pdfBuffer, {
      metadata: {
        contentType: 'application/pdf',
        cacheControl: 'no-cache, max-age=0',
      },
    });

    await fileRef.makePublic();

    const publicUrl = fileRef.publicUrl();

    if (!docURL) {
      await this.prisma.guarantee.update({
        where: {
          applicant_detail_id: id,
        },
        data: {
          docURL: publicUrl,
        },
      });
    }
    return publicUrl;
  }

  async uploadBuffer(
    buffer: Buffer,
    destinationPath: string,
    mimeType: string,
  ): Promise<string> {
    const fileRef = this.firebaseAdmin.storage().bucket().file(destinationPath);

    await fileRef.save(buffer, {
      metadata: {
        contentType: mimeType,
        cacheControl: 'no-cache, max-age=0',
      },
    });

    await fileRef.makePublic();

    const publicUrl = fileRef.publicUrl();

    return publicUrl;
  }
}
