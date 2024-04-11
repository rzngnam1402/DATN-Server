import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

export class ApplicantDetailDto {
  @IsNotEmpty()
  @IsNumber()
  applicant_detail_id: number;

  @IsNotEmpty()
  @IsString()
  businessName: string;

  @IsNotEmpty()
  @IsNumberString()
  businessRegistrationNumber: string;

  @IsNotEmpty()
  @IsString()
  businessAddress: string;

  @IsNotEmpty()
  @IsNumberString()
  debitAccountNo: string;

  @IsNotEmpty()
  @IsString()
  contactPersonName: string;

  @IsNotEmpty()
  @IsNumberString()
  citizenID: string;

  @IsNotEmpty()
  @IsEmail()
  applicantEmail: string;
}
