import {
  Controller,
  Get,
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

@UseGuards(JwtGuard, RolesGuard)
@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Roles(Role.CLIENT, Role.BANKER, Role.ADMIN)
  @Get('ping')
  pingApplicationService() {
    return this.applicationService.pingApplicationService();
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

  @Roles(Role.CLIENT, Role.BANKER, Role.ADMIN)
  @Get('all')
  async getAllApplications(@Req() data: Request) {
    return this.applicationService.getAllApplications(data);
  }
}
