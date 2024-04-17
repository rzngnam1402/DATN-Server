import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApplicantDetailDto } from './applicant-detail.dto';
import { BeneficiaryDetailDto } from './beneficiary-detail.dto';

export enum Status {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
}

export class GuaranteeDto {
  @IsNotEmpty()
  @IsNumber()
  application_id: number;

  @IsNotEmpty()
  @IsNumber()
  applicant_detail_id: number;

  @IsNotEmpty()
  @IsNumber()
  beneficiary_detail_id: number;

  @IsNotEmpty()
  @IsString()
  bankName: string;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsNumberString()
  amount: string;

  @IsOptional()
  collateralFile: any;

  @IsNotEmpty()
  @IsDateString()
  effectiveDate: Date;

  @IsNotEmpty()
  @IsDateString()
  updatedAt: Date;

  @IsNotEmpty()
  @IsString()
  purpose: string;

  @ValidateNested()
  @Type(() => ApplicantDetailDto)
  ApplicantDetail: ApplicantDetailDto;

  @ValidateNested()
  @Type(() => BeneficiaryDetailDto)
  BeneficiaryDetail: BeneficiaryDetailDto;
}
