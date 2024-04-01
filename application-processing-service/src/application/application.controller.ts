import { Controller } from '@nestjs/common';

import { ApplicationsService } from './application.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('applications')
export class ApplicationController {
  constructor(private applicationsService: ApplicationsService) {}

  @MessagePattern({ cmd: 'create' })
  handleCreate(payload: any) {
    const dto = payload.data;
    const file = payload.collateralFile;
    console.log(dto, payload.collateralFile);
    return this.applicationsService.create(dto, file);
  }

  @MessagePattern({ cmd: 'get-all' })
  handleGetAll(payload: any) {
    const data = payload;
    console.log(data);
    return this.applicationsService.getAll();
  }
}
