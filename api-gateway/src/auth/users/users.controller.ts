import { Controller, Get, Headers, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from '../guard/jwt.guard';
import { RolesGuard } from '../guard';
import { Role } from '../role/roles.enum';
import { Roles } from '../decorator/role.decorator';

@UseGuards(JwtGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Roles(Role.CLIENT, Role.BANKER, Role.ADMIN)
  @Get('me')
  getMe(@Headers('authorization') authHeader: string) {
    return this.userService.getMe(authHeader);
  }
}
