import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { BsignService } from './bsign.service';

@Controller('bsign')
export class BsignController {
  constructor(private bsignService: BsignService) {}

  @MessagePattern({ cmd: 'sign-guarantee' })
  async handleSignGuarantee(payload: {
    id: string;
    data: {
      accountId: string;
      placeholder: string;
      pdfFilePath: string;
      signatureImageURL: string;
      providerName: string;
    };
  }) {
    return this.bsignService.signGuarantee(payload);
  }
}
