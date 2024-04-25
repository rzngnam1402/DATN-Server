import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as pug from 'pug';
import * as path from 'path';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmailService {
  private transporter;
  constructor(private prisma: PrismaService) {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT),
      ignoreTLS: true,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  async sendMail(
    to: string,
    subject: string,
    text: string,
    html: string,
  ): Promise<void> {
    const mailOptions = {
      from: '"VieGuarantee Service" <vieguarantee@gmail.com>',
      to: to,
      subject: subject,
      text: text,
      html: html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`Message Sent ${info.response}`);
    } catch (error) {
      console.error(`Error when sending email: ${error}`);
      throw error;
    }
  }

  async sendIssuanceNotification(payload: { guaranteeId: string }) {
    try {
      const guarantee = await this.prisma.guarantee.findUnique({
        where: {
          guarantee_id: Number(payload.guaranteeId),
        },
        include: {
          ApplicantDetail: true,
          BeneficiaryDetail: true,
        },
      });
      const html = pug.renderFile(
        path.join(
          process.cwd(),
          './src/email/templates/guarantee-issuance-email.pug',
        ),
        {
          applicant_business_name: guarantee.ApplicantDetail.businessName,
          beneficiary_business_name: guarantee.BeneficiaryDetail.businessName,
          bankName: guarantee.bankName,
          guarantee_id: guarantee.guarantee_id,
          applicant_detail_id: guarantee.ApplicantDetail.applicant_detail_id,
          beneficiary_detail_id:
            guarantee.BeneficiaryDetail.beneficiary_detail_id,
          docURL: guarantee.docURL,
        },
      );
      await this.sendMail(
        guarantee.ApplicantDetail.applicantEmail,
        'Guarantee Issuance Notification',
        '',
        html,
      );
      await this.sendMail(
        guarantee.BeneficiaryDetail.email,
        'Guarantee Issuance Notification',
        '',
        html,
      );
      return 'Email sent successfully';
    } catch (error) {
      console.error('Failed to send email:', error);
      return 'Failed to send email';
    }
  }
}
