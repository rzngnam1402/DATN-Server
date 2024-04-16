import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @MessagePattern({ cmd: 'get-me' })
  async handleGetMe(token: string) {
    return this.userService.getMe(token);
  }

  @MessagePattern({ cmd: 'get-all-user' })
  async handleGetAllUsers() {
    return this.userService.getAllUsers();
  }
  @MessagePattern({ cmd: 'get-signature' })
  async handleGetSignature(data: any) {
    return this.userService.getSignature(data);
  }

  @MessagePattern({ cmd: 'add-signature' })
  async handleAddSignature(data: { id: string; signature: string }) {
    return this.userService.addSignature(data);
  }
}
