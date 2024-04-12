import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/auth/role/roles.enum';
import { GuaranteeService } from './guarantee.service';

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
}
