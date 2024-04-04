import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsOptional()
  @IsDateString()
  birthday: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  company: string;
}
