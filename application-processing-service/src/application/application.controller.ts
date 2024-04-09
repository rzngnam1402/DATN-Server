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

  @MessagePattern({ cmd: 'get-all-apps-user' })
  handleGetAllApplicationsUser(payload: string) {
    const data = payload;
    return this.applicationsService.getAllApplicationsUser(data);
  }

  @MessagePattern({ cmd: 'get-all-apps-banker' })
  handleGetAllApplicationsBanker(payload: string) {
    const data = payload;
    return this.applicationsService.getAllApplicationsBanker(data);
  }

  @MessagePattern({ cmd: 'get-app-by-id' })
  handleGetApplicationById(payload: number) {
    const data = payload;
    return this.applicationsService.getApplicationById(data);
  }

  @MessagePattern({ cmd: 'update-app-by-id' })
  handleUpdateApplicationById(payload: any) {
    const { id, data } = payload;
    return this.applicationsService.updateApplicationById(id, data);
  }
}
