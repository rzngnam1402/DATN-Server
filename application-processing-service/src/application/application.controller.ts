import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { ApplicationsService } from './application.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApplicationDto } from 'src/dto/application.dto';
// import { JwtAuthGuard } from './auth/JwtGuard.guard';

@Controller('applications')
export class ApplicationController {
  constructor(private applicationsService: ApplicationsService) {}
  // @UseGuards(CustomJwtGuard)
  @Post('create')
  @UseInterceptors(AnyFilesInterceptor())
  // @UseGuards(JwtAuthGuard)
  async create(
    @Body() dto: ApplicationDto,
    @UploadedFiles() collateralFile: Express.Multer.File[],
  ) {
    return this.applicationsService.create(dto, collateralFile);
  }

  @Get()
  async getAll() {
    return this.applicationsService.getAll();
  }
}
