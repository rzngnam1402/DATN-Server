import { Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
import { GuaranteeDto } from 'src/dto/guarantee.dto';
// import { Status } from 'src/enum/status.enum';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GuaranteeService {
  constructor(private prisma: PrismaService) {}
  handleCreate(dto: GuaranteeDto) {
    try {
      console.log(dto);
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
