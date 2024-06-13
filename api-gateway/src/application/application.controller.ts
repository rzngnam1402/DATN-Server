import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/auth/role/roles.enum';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/auth/guard';
import { Request } from 'express';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/auth/decorator';

@UseGuards(JwtGuard, RolesGuard)
@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Roles(Role.CLIENT, Role.BANKER, Role.ADMIN)
  @Get('ping')
  pingApplicationService() {
    return this.applicationService.pingApplicationService();
  }

  @Roles(Role.ADMIN)
  @Get('stats')
  getStats() {
    return this.applicationService.getStats();
  }

  @Roles(Role.CLIENT, Role.ADMIN)
  @Post('create')
  @UseInterceptors(AnyFilesInterceptor())
  async create(
    @Req() data: Request,
    @UploadedFiles() collateralFile: Express.Multer.File,
  ) {
    return this.applicationService.create(data, collateralFile);
  }

  // get all application from user
  @Roles(Role.CLIENT, Role.ADMIN)
  @Get('user/all')
  async getAllApplicationsUser(@GetUser() user: any) {
    return this.applicationService.getAllApplicationsUser(user);
  }

  @Roles(Role.BANKER, Role.ADMIN)
  @Get('banker/all')
  async getAllApplicationsBanker(@GetUser() user: any) {
    return this.applicationService.getAllApplicationsBanker(user);
  }

  @Roles(Role.CLIENT, Role.BANKER, Role.ADMIN)
  @Get(':id')
  async getApplicationById(@Param('id') id: string) {
    return this.applicationService.getApplicationById(id);
  }

  @Roles(Role.CLIENT, Role.BANKER, Role.ADMIN)
  @Patch(':id')
  async updateApplicationById(@Param('id') id: string, @Req() data: Request) {
    return this.applicationService.updateApplicationById(id, data);
  }
}
