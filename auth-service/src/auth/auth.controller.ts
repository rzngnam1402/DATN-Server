import { Body, Controller, ForbiddenException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern({ cmd: 'signup' })
  hadnleSignup(dto: AuthDto): Promise<{ access_token: string }> {
    console.log('Signup requested', dto);
    return this.authService.signup(dto);
  }

  @MessagePattern({ cmd: 'signin' })
  hadnleSignin(
    dto: AuthDto,
  ): Promise<{ access_token: string } | ForbiddenException> {
    console.log('Signin requested', dto);
    return this.authService.signin(dto);
  }

  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
