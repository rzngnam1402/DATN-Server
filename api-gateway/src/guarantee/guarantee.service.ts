import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
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

  generateGuarantee() {
    const pattern = { cmd: 'gen-guarantee' };
    const payload = {};
    return this.guaranteeClient.send(pattern, payload);
  }
}
