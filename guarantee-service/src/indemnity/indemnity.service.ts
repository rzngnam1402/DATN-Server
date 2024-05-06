import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { IndemnityDto } from 'src/dto/indemnity.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IndemnityService {
  constructor(private prisma: PrismaService) {}

  async createNewIndemnity(dto: IndemnityDto) {
    const indemnity = await this.prisma.indemnity.create({
      data: {
        guarantee_id: Number(dto.guarantee_id),
        reason: dto.reason,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return indemnity;
  }

  async getAllIndemnitiesClient(email: string) {
    const res = await this.prisma.indemnity.findMany({
      where: {
        guarantee: {
          ApplicantDetail: {
            applicantEmail: email,
          },
        },
      },
      include: {
        guarantee: {
          include: {
            ApplicantDetail: true,
            BeneficiaryDetail: true,
          },
        },
      },
    });
    return res;
  }

  async getIndemnityById(id: number) {
    try {
      const res = await this.prisma.indemnity.findFirstOrThrow({
        where: {
          indemnity_id: id,
        },
        include: {
          guarantee: {
            include: {
              ApplicantDetail: true,
              BeneficiaryDetail: true,
            },
          },
        },
      });
      return res;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          return new ForbiddenException('Indemnity not found');
        }
      }
    }
  }
}
