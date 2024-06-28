import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { IndemnityDto } from 'src/dto/indemnity.dto';
import { PdfGeneratorService } from 'src/pdf-generator/pdf-generator.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IndemnityService {
  constructor(
    private prisma: PrismaService,
    private pdfService: PdfGeneratorService,
  ) {}

  async createNewIndemnity(dto: IndemnityDto) {
    let fileURL = null;
    if (dto.relatedFile) {
      const file = dto.relatedFile[0];
      const buffer = Buffer.from(file.buffer);
      fileURL = await this.pdfService.uploadBuffer(
        buffer,
        `indemnity_document/${dto.guarantee_id}`,
        'application/pdf',
      );
    }

    const indemnity = await this.prisma.indemnity.create({
      data: {
        guarantee_id: Number(dto.guarantee_id),
        reason: dto.reason,
        relatedFile: dto.relatedFile ? fileURL : null,
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

  async getAllIndemnitiesBanker(bankName: string) {
    const res = await this.prisma.indemnity.findMany({
      where: {
        guarantee: {
          bankName: bankName,
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

  async updateIndemnityById(id: number, dto: IndemnityDto) {
    try {
      const res = await this.prisma.indemnity.update({
        where: {
          indemnity_id: id,
        },
        data: {
          status: dto.status,
        },
      });
      return res;
    } catch (error) {}
  }
}
