import { ForbiddenException, Global, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import { ConfigService } from '@nestjs/config';

@Global()
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
          company: dto.company,
        },
      });
      return this.signToken(
        user.id,
        user.email,
        user.username,
        user.role,
        user.company,
      );
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

    return this.signToken(
      user.id,
      user.email,
      user.username,
      user.role,
      user.company,
    );
  }

  async signToken(
    userId: number,
    email: string,
    username: string,
    role: string,
    company: string,
  ): Promise<{ access_token: string; role: string }> {
    const payload = {
      sub: userId,
      email,
      username,
      role,
      company,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '60m',
      secret: secret,
    });
    return {
      access_token: token,
      role: role,
    };
  }

  async verifyToken(token: string): Promise<any> {
    try {
      const secret = this.config.get('JWT_SECRET');
      const decoded = this.jwt.verify(token, { secret: secret });
      return decoded ? { isValid: true, decoded } : { isValid: false };
    } catch (error) {
      return error;
    }
  }
}
