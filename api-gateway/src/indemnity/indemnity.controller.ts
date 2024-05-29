import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorator/role.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/auth/guard';
import { Role } from 'src/auth/role/roles.enum';
import { GetUser } from 'src/auth/decorator';
import { IndemnityService } from './indemnity.service';
import { Request } from 'express';

@UseGuards(JwtGuard, RolesGuard)
@Controller('indemnity')
export class IndemnityController {
  constructor(private readonly indemnitySerivce: IndemnityService) {}

  @Roles(Role.CLIENT, Role.ADMIN)
  @Post('create-new')
  createIndemnity(@Req() req: Request) {
    return this.indemnitySerivce.createNewIndemnity(req);
  }

  @Roles(Role.CLIENT, Role.ADMIN)
  @Get('client/all')
  getAllIndemnitiesClient(@GetUser() user: any) {
    return this.indemnitySerivce.getAllIndemnitiesClient(user);
  }

  @Roles(Role.BANKER, Role.ADMIN)
  @Get('banker/all')
  getAllIndemnitiesBanker(@GetUser() user: any) {
    return this.indemnitySerivce.getAllIndemnitiesBanker(user);
  }

  @Roles(Role.CLIENT, Role.BANKER, Role.ADMIN)
  @Get(':id')
  async getGuaranteeById(@Param('id') id: string) {
    return this.indemnitySerivce.getIndemnityById(id);
  }

  @Roles(Role.CLIENT, Role.BANKER, Role.ADMIN)
  @Patch(':id')
  async updateIndemnityById(@Param('id') id: string, @Req() data: Request) {
    return this.indemnitySerivce.updateIndemnityById(id, data);
  }
}
