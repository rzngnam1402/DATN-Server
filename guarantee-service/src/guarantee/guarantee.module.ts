import { Module } from '@nestjs/common';
import { GuaranteeController } from './guarantee.controller';
import { GuaranteeService } from './guarantee.service';

@Module({
  providers: [GuaranteeService],
  controllers: [GuaranteeController],
})
export class GuaranteeModule {}
