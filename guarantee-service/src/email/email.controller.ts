import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}
  @MessagePattern({ cmd: 'send-notification-email' })
  async handleSendIssuanceNotification(payload: { guaranteeId: string }) {
    return this.emailService.sendIssuanceNotification(payload);
  }
}
