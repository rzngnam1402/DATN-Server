import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationsService } from './application.service';

@Module({
  controllers: [ApplicationController],
  providers: [ApplicationsService],
})
export class ApplicationModule {}
