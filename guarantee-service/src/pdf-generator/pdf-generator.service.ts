import { Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as pdf from 'pdf-creator-node';
import * as path from 'path';
import { PDF_OPTIONS } from './configs/option.config';
import * as admin from 'firebase-admin';

@Injectable()
export class PdfGeneratorService {
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App,
  ) {}

  async genGuaranteeDoc(dto: any) {
    console.log(dto);
    const html = fs.readFileSync(
      path.join(process.cwd(), './src/pdf-generator/templates/template.html'),
      'utf-8',
    );
    const document = {
      html: html,
      data: {},
      type: 'buffer',
    };

    const pdfBuffer = await pdf.create(document, PDF_OPTIONS);
    const fileName = `guarantee-documents/test.pdf`;
    const fileRef = this.firebaseAdmin.storage().bucket().file(fileName);
    await fileRef.save(pdfBuffer, {
      metadata: {
        contentType: 'application/pdf',
        cacheControl: 'no-cache, max-age=0',
      },
    });

    await fileRef.makePublic();

    const publicUrl = fileRef.publicUrl();
    return publicUrl;
  }
}
