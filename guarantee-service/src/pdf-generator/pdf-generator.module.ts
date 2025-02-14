import { Module } from '@nestjs/common';
import { PdfGeneratorService } from './pdf-generator.service';
import { PdfGeneratorController } from './pdf-generator.controller';

@Module({
  providers: [PdfGeneratorService],
  controllers: [PdfGeneratorController],
  exports: [PdfGeneratorService],
})
export class PdfGeneratorModule {}
