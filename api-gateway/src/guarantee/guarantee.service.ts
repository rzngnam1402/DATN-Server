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

  createGuarantee(req: Request) {
    const pattern = { cmd: 'create-new' };
    const payload = req.body;
    console.log(payload);
    return this.guaranteeClient.send(pattern, payload);
  }

  generateGuarantee(id: string) {
    const pattern = { cmd: 'gen-guarantee' };
    const payload = id;
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
}
