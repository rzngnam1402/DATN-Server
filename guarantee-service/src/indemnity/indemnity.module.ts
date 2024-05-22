import { Module } from '@nestjs/common';
import { IndemnityService } from './indemnity.service';
import { IndemnityController } from './indemnity.controller';
import { PdfGeneratorService } from 'src/pdf-generator/pdf-generator.service';

@Module({
  providers: [IndemnityService, PdfGeneratorService],
  controllers: [IndemnityController],
})
export class IndemnityModule {}
