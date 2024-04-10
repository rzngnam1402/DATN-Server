import { Controller } from '@nestjs/common';
import { PdfGeneratorService } from './pdf-generator.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('pdf-generator')
export class PdfGeneratorController {
  constructor(private pdfGeneratorService: PdfGeneratorService) {}
  @MessagePattern({ cmd: 'gen-guarantee' })
  async genPDF() {
    return await this.pdfGeneratorService.genGuaranteeDoc();
  }
}
