import { IsEnum, IsString } from 'class-validator';
import { IndemnityStatus } from 'src/enum';

export class IndemnityDto {
  @IsEnum(IndemnityStatus, { message: 'Status must be a valid enum value' })
  status: IndemnityStatus;

  @IsString()
  reason?: string;

  @IsString()
  guarantee_id: string;
}
