import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { Roles } from 'src/auth/decorator/role.decorator';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Role } from 'src/auth/role/roles.enum';

@UseGuards(JwtGuard, RolesGuard)
@Controller('users')
export class UserController {
  @Roles(Role.CLIENT, Role.BANKER, Role.ADMIN)
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }
}
