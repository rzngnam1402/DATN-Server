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

  async getAllUsers() {
    const allUsers = await this.prisma.user.findMany();
    allUsers.map((user) => delete user.hash);
    return allUsers;
  }

  async handleGetStats() {
    try {
      const count = await this.prisma.user.count();
      const data = { count };
      return data;
    } catch (error) {
      console.error('Error counting unique users:', error);
      throw error;
    }
  }

  async getSignature(data: { email: string }) {
    try {
      const res = await this.prisma.user.findFirstOrThrow({
        where: {
          email: data.email,
        },
      });
      return res.signature;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async addSignature(data: { id: string; signature: string }) {
    const { id, signature } = data;
    console.log(id, signature);
    try {
      const res = await this.prisma.user.update({
        where: {
          id: Number(id),
        },
        data: { signature: signature },
      });
      return res;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
