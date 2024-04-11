import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BeneficiaryDetailDto {
  @IsNotEmpty()
  @IsNumber()
  beneficiary_detail_id: number;

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
  @IsEmail()
  email: string;
}
