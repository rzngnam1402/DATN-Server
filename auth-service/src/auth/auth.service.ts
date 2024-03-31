import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          username: dto.username,
          hash,
          // birthday: new Date(dto.birthday),
          phone: dto.phone,
          address: dto.address,
        },
      });
      return this.signToken(user.id, user.email, user.role);
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          return new ForbiddenException('Credentials taken');
        }
      }
      return err;
    }
  }

  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      return new ForbiddenException('Credentials incorrect');
    }

    const hash = await argon.verify(user.hash, dto.password);

    if (!hash) {
      return new ForbiddenException('Credentials incorrect');
    }

    return this.signToken(user.id, user.email, user.role);
  }

  async signToken(
    userId: number,
    email: string,
    role: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
      role,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '60m',
      secret: secret,
    });
    return {
      access_token: token,
    };
  }

  async verifyToken(token: string): Promise<any> {
    try {
      console.log('verifying token..');
      const decoded = this.jwt.verify(token);
      return decoded ? { isValid: true, decoded } : { isValid: false };
    } catch (error) {
      return { isValid: false };
    }
  }
}
