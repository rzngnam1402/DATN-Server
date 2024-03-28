import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApplicationDto } from 'src/dto/application.dto';
import { ApplicationStatus } from 'src/enum/status.enum';

@Injectable()
export class ApplicationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: ApplicationDto, collateralFile: Express.Multer.File[]) {
    const effectiveDate = new Date(dto.effectiveDate);
    const file = collateralFile[0];
    const applicationData = {
      bankName: dto.bankName,
      amount: dto.amount,
      currency: dto.currency,
      effectiveDate,
      purpose: dto.purpose,
      status: ApplicationStatus.UNDER_REVIEW,
      collateralFile: file ? file.buffer : null,

      // Relational data
      ApplicantDetail: {
        create: {
          businessName: dto.businessName,
          businessRegistrationNumber: dto.businessRegistrationNumber,
          businessAddress: dto.businessAddress,
          debitAccountNo: dto.debitAccountNo,
          contactPersonName: dto.contactPersonName,
          citizenID: dto.citizenID,
          applicantEmail: dto.applicantEmail,
        },
      },
      BeneficiaryDetail: {
        create: {
          businessName: dto.beneficiaryBusinessName,
          businessRegistrationNumber: dto.beneficiaryBusinessRegistrationNumber,
          businessAddress: dto.beneficiaryBusinessAddress,
          email: dto.beneficiaryEmail,
        },
      },
    };

    return this.prisma.application.create({
      data: applicationData,
    });
  }

  async getAll() {
    const response = await this.prisma.application.findMany();
    return response;
  }
}
