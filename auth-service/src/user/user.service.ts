import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly authService: AuthService,
    private prisma: PrismaService,
  ) {}
  async getMe(token: string) {
    const payload = await this.authService.verifyToken(token);
    const email = payload.decoded.email;
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    delete user.hash;
    return user;
  }
}
