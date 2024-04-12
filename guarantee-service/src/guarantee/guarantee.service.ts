import { Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
import { GuaranteeDto } from 'src/dto/guarantee.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GuaranteeService {
  constructor(private prisma: PrismaService) {}
  handleCreate(dto: GuaranteeDto) {
    try {
      const expiryDate = new Date(dto.effectiveDate);
      const startDate = new Date(dto.updatedAt);
      const guaranteeData = {
        bankName: dto.bankName,
        amount: dto.amount,
        currency: dto.currency,
        expiryDate,
        startDate,
        purpose: dto.purpose,
        status: Status.NOT_ISSUED,

        // Relational data
        ApplicantDetail: {
          create: {
            applicant_detail_id: dto.applicant_detail_id.toString(),
            businessName: dto.ApplicantDetail.businessName,
            businessRegistrationNumber:
              dto.ApplicantDetail.businessRegistrationNumber,
            businessAddress: dto.ApplicantDetail.businessAddress,
            debitAccountNo: dto.ApplicantDetail.debitAccountNo,
            contactPersonName: dto.ApplicantDetail.contactPersonName,
            citizenID: dto.ApplicantDetail.citizenID,
            applicantEmail: dto.ApplicantDetail.applicantEmail,
          },
        },
        BeneficiaryDetail: {
          create: {
            beneficiary_detail_id: dto.beneficiary_detail_id.toString(),
            businessName: dto.BeneficiaryDetail.businessName,
            businessRegistrationNumber:
              dto.BeneficiaryDetail.businessRegistrationNumber,
            businessAddress: dto.BeneficiaryDetail.businessAddress,
            email: dto.BeneficiaryDetail.email,
          },
        },
      };

      return this.prisma.guarantee.create({
        data: guaranteeData,
      });
    } catch {}
    return 'guarantee-created';
  }
}
