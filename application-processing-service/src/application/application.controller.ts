import { Controller } from '@nestjs/common';

import { ApplicationService } from './application.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('applications')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  @MessagePattern({ cmd: 'create' })
  handleCreate(payload: any) {
    const dto = payload.data;
    const file = payload.collateralFile;
    console.log(dto, payload.collateralFile);
    return this.applicationService.create(dto, file);
  }

  @MessagePattern({ cmd: 'get-all-apps-user' })
  handleGetAllApplicationsUser(payload: string) {
    const data = payload;
    return this.applicationService.getAllApplicationsUser(data);
  }

  @MessagePattern({ cmd: 'get-all-apps-banker' })
  handleGetAllApplicationsBanker(payload: string) {
    const data = payload;
    return this.applicationService.getAllApplicationsBanker(data);
  }

  @MessagePattern({ cmd: 'get-app-by-id' })
  handleGetApplicationById(payload: number) {
    const data = payload;
    return this.applicationService.getApplicationById(data);
  }

  @MessagePattern({ cmd: 'update-app-by-id' })
  handleUpdateApplicationById(payload: any) {
    const { id, data } = payload;
    return this.applicationService.updateApplicationById(id, data);
  }
}
