import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma, Status } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
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

  async getAllGuaranteesBanker(company: string) {
    const res = await this.prisma.guarantee.findMany({
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

  async getAllGuaranteesClient(email: string) {
    const res = await this.prisma.guarantee.findMany({
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

  async getGuaranteeById(id: number) {
    try {
      const res = await this.prisma.guarantee.findFirstOrThrow({
        where: {
          guarantee_id: id,
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
          return new ForbiddenException('Guarantee not found');
        }
      }
    }
  }

  async updateGuaranteeById(id: number, dto: GuaranteeDto) {
    try {
      type UpdateGuaranteeDto = Omit<
        GuaranteeDto,
        'applicant_detail_id' | 'beneficiary_detail_id'
      >;

      const updatedData: UpdateGuaranteeDto = {
        ...dto,
      };
      const res = await this.prisma.guarantee.update({
        where: {
          guarantee_id: id,
        },
        data: updatedData as Prisma.GuaranteeUncheckedUpdateInput,
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
