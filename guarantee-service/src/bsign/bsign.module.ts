import { Module } from '@nestjs/common';
import { BsignController } from './bsign.controller';
import { BsignService } from './bsign.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import { PdfGeneratorService } from 'src/pdf-generator/pdf-generator.service';

@Module({
  providers: [BsignService, FirebaseService, PdfGeneratorService],
  controllers: [BsignController],
})
export class BsignModule {}
