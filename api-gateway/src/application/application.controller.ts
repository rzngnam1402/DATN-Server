import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/auth/role/roles.enum';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/auth/guard';

@UseGuards(JwtGuard, RolesGuard)
@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Roles(Role.CLIENT, Role.BANKER, Role.ADMIN)
  @Get('ping')
  pingApplicationService() {
    return this.applicationService.pingApplicationService();
  }
}
