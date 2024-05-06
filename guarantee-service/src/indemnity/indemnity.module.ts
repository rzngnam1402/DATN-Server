import { Module } from '@nestjs/common';
import { IndemnityService } from './indemnity.service';
import { IndemnityController } from './indemnity.controller';

@Module({
  providers: [IndemnityService],
  controllers: [IndemnityController],
})
export class IndemnityModule {}
