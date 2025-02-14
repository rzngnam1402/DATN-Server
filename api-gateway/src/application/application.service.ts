import { Inject, Injectable, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { map } from 'rxjs';

@Injectable()
export class ApplicationService {
  constructor(
    @Inject('APPLICATION_CLIENT') private applicationClient: ClientProxy,
  ) {}

  pingApplicationService() {
    const startTs = Date.now();
    const pattern = { cmd: 'ping' };
    const payload = {};
    return this.applicationClient
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - startTs })),
      );
  }

  create(@Req() data: Request, collateralFile: Express.Multer.File) {
    const pattern = { cmd: 'create' };
    const payload = { data: data.body, collateralFile };
    return this.applicationClient.send(pattern, payload);
  }

  getStats() {
    const pattern = { cmd: 'get-stats' };
    const payload = {};
    return this.applicationClient.send(pattern, payload);
  }

  getAllApplicationsUser(user: any) {
    const pattern = { cmd: 'get-all-apps-user' };
    const payload = user.email;
    return this.applicationClient.send(pattern, payload);
  }

  getAllApplicationsBanker(user: any) {
    const pattern = { cmd: 'get-all-apps-banker' };
    const payload = user.company;
    return this.applicationClient.send(pattern, payload);
  }

  getApplicationById(id: string) {
    const pattern = { cmd: 'get-app-by-id' };
    const payload = Number(id);
    return this.applicationClient.send(pattern, payload);
  }

  updateApplicationById(id: string, data: Request) {
    const pattern = { cmd: 'update-app-by-id' };
    const payload = { id: Number(id), data: data.body };
    return this.applicationClient.send(pattern, payload);
  }
}
