import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({ cmd: 'ping' })
  handlePing(data: any): string {
    console.log('Ping received', data);
    return 'pong';
  }

  @MessagePattern('create')
  create_2(data: any) {
    console.log('create_requested', data);
  }
}
