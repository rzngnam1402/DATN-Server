import { Module } from '@nestjs/common';
import { IndemnityService } from './indemnity.service';
import { IndemnityController } from './indemnity.controller';
import { PdfGeneratorModule } from 'src/pdf-generator/pdf-generator.module';

@Module({
  providers: [IndemnityService],
  controllers: [IndemnityController],
  imports: [PdfGeneratorModule],
})
export class IndemnityModule {}
