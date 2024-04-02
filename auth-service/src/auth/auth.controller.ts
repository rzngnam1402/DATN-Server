import { Controller, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern({ cmd: 'signup' })
  handleSignup(dto: AuthDto): Promise<{ access_token: string }> {
    return this.authService.signup(dto);
  }

  @MessagePattern({ cmd: 'signin' })
  handleSignin(
    dto: AuthDto,
  ): Promise<{ access_token: string } | ForbiddenException> {
    return this.authService.signin(dto);
  }
}
