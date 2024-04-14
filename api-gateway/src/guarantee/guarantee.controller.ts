import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/auth/role/roles.enum';
import { GuaranteeService } from './guarantee.service';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/auth/guard';

@UseGuards(JwtGuard, RolesGuard)
@Controller('guarantee')
export class GuaranteeController {
  constructor(private readonly guaranteeService: GuaranteeService) {}

  @Roles(Role.CLIENT, Role.BANKER, Role.ADMIN)
  @Get('ping')
  pingGuaranteeService() {
    return this.guaranteeService.pingGuaranteeService();
  }

  @Post('create-new')
  createGuarantee(@Req() req: Request) {
    return this.guaranteeService.createGuarantee(req);
  }

  @Get('gen-guarantee/:id')
  generateGuarantee(@Param('id') id: string) {
    return this.guaranteeService.generateGuarantee(id);
  }

  @Get('banker/all')
  getAllGuaranteesBanker(@GetUser() user: any) {
    return this.guaranteeService.getAllGuaranteesBanker(user);
  }
}
