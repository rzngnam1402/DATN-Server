import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from '../guard/jwt.guard';
import { RolesGuard } from '../guard';
import { Role } from '../role/roles.enum';
import { Roles } from '../decorator/role.decorator';
import { GetToken } from '../decorator/get-token.decorator';

@UseGuards(JwtGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Roles(Role.CLIENT, Role.BANKER, Role.ADMIN)
  @Get('me')
  getMe(@GetToken() token: string) {
    return this.userService.getMe(token);
  }

  @Roles(Role.CLIENT, Role.BANKER, Role.ADMIN)
  @Get('all')
  getAll() {
    return this.userService.getAll();
  }

  @Roles(Role.CLIENT, Role.BANKER, Role.ADMIN)
  @Get('signature')
  getSignature(@Req() data: Request) {
    return this.userService.getSignature(data);
  }

  @Roles(Role.CLIENT, Role.BANKER, Role.ADMIN)
  @Patch('signature')
  addSignature(@Req() data: Request) {
    return this.userService.addSignature(data);
  }
}
