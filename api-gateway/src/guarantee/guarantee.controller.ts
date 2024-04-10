import { Controller, Get } from '@nestjs/common';
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

  @Get('gen-guarantee')
  generateGuarantee() {
    return this.guaranteeService.generateGuarantee();
  }
}
