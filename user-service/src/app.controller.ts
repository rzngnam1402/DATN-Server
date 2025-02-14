import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'ping' })
  handlePing(data: any): string {
    console.log('Ping received', data);
    return 'pong';
  }
}
