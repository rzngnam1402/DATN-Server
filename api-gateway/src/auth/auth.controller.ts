import { Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('ping')
  pingAuthService() {
    return this.authService.pingAuthService();
  }

  @Post('signup')
  signup(@Req() data: Request) {
    return this.authService.signup(data);
  }

  @Post('signin')
  signin(@Req() data: Request) {
    return this.authService.signin(data);
  }
}
