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
}
