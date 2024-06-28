import { IndemnityStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class IndemnityDto {
  @IsOptional()
  @IsEnum(IndemnityStatus, { message: 'Status must be a valid enum value' })
  status: IndemnityStatus;

  @IsString()
  reason?: string;

  @IsString()
  guarantee_id: string;

  @IsOptional()
  relatedFile: Express.Multer.File[];
}
