import { Controller } from '@nestjs/common';
import { PdfGeneratorService } from './pdf-generator.service';
import { MessagePattern } from '@nestjs/microservices';
// import { GuaranteeDto } from 'src/dto/guarantee.dto';

@Controller('pdf-generator')
export class PdfGeneratorController {
  constructor(private pdfGeneratorService: PdfGeneratorService) {}
  @MessagePattern({ cmd: 'gen-guarantee' })
  async genPDF(dto: any) {
    return await this.pdfGeneratorService.genGuaranteeDoc(dto);
  }
}
