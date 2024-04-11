import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsOptional,
  IsEmail,
  IsEnum,
} from 'class-validator';
import { ApplicationStatus } from 'src/enum/status.enum';

export class ApplicationDto {
  @IsNotEmpty()
  @IsString()
  businessName: string;

  @IsNotEmpty()
  @IsString()
  businessRegistrationNumber: string;

  @IsNotEmpty()
  @IsString()
  businessAddress: string;

  @IsNotEmpty()
  @IsString()
  debitAccountNo: string;

  @IsNotEmpty()
  @IsString()
  contactPersonName: string;

  @IsNotEmpty()
  @IsString()
  citizenID: string;

  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;

  @IsNotEmpty()
  @IsEmail()
  applicantEmail: string;

  // Beneficiary Details
  @IsNotEmpty()
  @IsString()
  beneficiaryBusinessName: string;

  @IsNotEmpty()
  @IsString()
  beneficiaryBusinessRegistrationNumber: string;

  @IsNotEmpty()
  @IsString()
  beneficiaryBusinessAddress: string;

  @IsNotEmpty()
  @IsEmail()
  beneficiaryEmail: string;

  // Guarantee Details
  @IsNotEmpty()
  @IsString()
  bankName: string;

  @IsNotEmpty()
  @IsString()
  amount: string;

  @IsOptional()
  collateralFile: any;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsDate()
  effectiveDate: Date;

  @IsNotEmpty()
  @IsString()
  purpose: string;
}
