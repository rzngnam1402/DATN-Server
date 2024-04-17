import { Module } from '@nestjs/common';
import { BsignController } from './bsign.controller';
import { BsignService } from './bsign.service';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  providers: [BsignService, FirebaseService],
  controllers: [BsignController],
})
export class BsignModule {}
