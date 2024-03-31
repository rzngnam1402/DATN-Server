import { Controller, Get } from '@nestjs/common';

import { ApplicationsService } from './application.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('applications')
export class ApplicationController {
  constructor(private applicationsService: ApplicationsService) {}

  // @Post('create')
  // @UseInterceptors(AnyFilesInterceptor())
  // async create(
  //   @Body() dto: ApplicationDto,
  //   @UploadedFiles() collateralFile: Express.Multer.File[],
  // ) {
  //   return this.applicationsService.create(dto, collateralFile);
  // }

  @MessagePattern({ cmd: 'create' })
  handleCreate(payload: any) {
    const dto = payload.data;
    const file = payload.collateralFile;
    console.log(dto, payload.collateralFile);
    return this.applicationsService.create(dto, file);
  }

  @Get()
  async getAll() {
    return this.applicationsService.getAll();
  }
}
