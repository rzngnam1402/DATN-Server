import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApplicationDto } from 'src/dto/application.dto';
import { ApplicationStatus } from 'src/enum/status.enum';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ApplicationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: ApplicationDto, collateralFile: Express.Multer.File[]) {
    const effectiveDate = new Date(dto.effectiveDate);
    let file = null;
    if (collateralFile) {
      file = JSON.stringify(collateralFile[0]);
    }
    const applicationData = {
      bankName: dto.bankName,
      amount: dto.amount,
      currency: dto.currency,
      effectiveDate,
      purpose: dto.purpose,
      status: ApplicationStatus.UNDER_REVIEW,
      collateralFile: file,

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

  async getAllApplicationsUser(email: string) {
    const res = await this.prisma.application.findMany({
      where: {
        ApplicantDetail: {
          applicantEmail: email,
        },
      },
      include: {
        ApplicantDetail: true,
        BeneficiaryDetail: true,
      },
    });
    return res;
  }

  async getAllApplicationsBanker(company: string) {
    const res = await this.prisma.application.findMany({
      where: {
        bankName: company,
      },
      include: {
        ApplicantDetail: true,
        BeneficiaryDetail: true,
      },
    });
    return res;
  }

  async getApplicationById(id: number) {
    try {
      const res = await this.prisma.application.findFirstOrThrow({
        where: {
          application_id: id,
        },
        include: {
          ApplicantDetail: true,
          BeneficiaryDetail: true,
        },
      });
      return res;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          return new ForbiddenException('Applcation not found');
        }
      }
    }
  }

  async updateApplicationById(id: number, dto: ApplicationDto) {
    try {
      const res = await this.prisma.application.update({
        where: {
          application_id: id,
        },
        data: dto,
        include: {
          ApplicantDetail: true,
          BeneficiaryDetail: true,
        },
      });
      return res;
    } catch (error) {
      return error.message;
    }
  }
}
