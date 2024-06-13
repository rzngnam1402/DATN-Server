import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { map } from 'rxjs';

@Injectable()
export class GuaranteeService {
  constructor(
    @Inject('GUARANTEE_CLIENT') private guaranteeClient: ClientProxy,
  ) {}

  pingGuaranteeService() {
    const startTs = Date.now();
    const pattern = { cmd: 'ping' };
    const payload = {};
    return this.guaranteeClient
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - startTs })),
      );
  }

  createGuarantee(req: Request) {
    const pattern = { cmd: 'create-new' };
    const payload = req.body;
    return this.guaranteeClient.send(pattern, payload);
  }

  generateGuarantee(id: string) {
    const pattern = { cmd: 'gen-guarantee' };
    const payload = id;
    return this.guaranteeClient.send(pattern, payload);
  }

  getStats() {
    const pattern = { cmd: 'get-guarantee-stats' };
    const payload = {};
    return this.guaranteeClient.send(pattern, payload);
  }

  getGuaranteeById(id: string) {
    const pattern = { cmd: 'get-guarantee-by-id' };
    const payload = Number(id);
    return this.guaranteeClient.send(pattern, payload);
  }

  getAllGuaranteesBanker(user: any) {
    const pattern = { cmd: 'get-all-guarantees-banker' };
    const payload = user.company;
    return this.guaranteeClient.send(pattern, payload);
  }

  getAllGuaranteesClient(user: any) {
    const pattern = { cmd: 'get-all-guarantees-client' };
    const payload = user.email;
    return this.guaranteeClient.send(pattern, payload);
  }

  signGuarantee(id: string, data: Request) {
    const pattern = { cmd: 'sign-guarantee' };
    const payload = { id, data: data.body };
    return this.guaranteeClient.send(pattern, payload);
  }

  updateGuaranteeById(id: string, data: Request) {
    const pattern = { cmd: 'update-guarantee-by-id' };
    const payload = { id: Number(id), data: data.body };
    return this.guaranteeClient.send(pattern, payload);
  }

  sendGuaranteeNotification(data: Request) {
    const pattern = { cmd: 'send-notification-email' };
    const payload = data.body;
    return this.guaranteeClient.send(pattern, payload);
  }
}
