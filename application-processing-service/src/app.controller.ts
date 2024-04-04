import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @MessagePattern({ cmd: 'ping' })
  handlePing(data: any): string {
    console.log('Ping received', data);
    return 'pong';
  }
}
