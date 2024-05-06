import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class IndemnityService {
  constructor(
    @Inject('GUARANTEE_CLIENT') private guaranteeClient: ClientProxy,
  ) {}

  createNewIndemnity(req: Request) {
    const pattern = { cmd: 'create-new-indemnity' };
    const payload = req.body;
    return this.guaranteeClient.send(pattern, payload);
  }

  getAllIndemnitiesClient(user: any) {
    const pattern = { cmd: 'get-all-indemnities-client' };
    const payload = user.email;
    return this.guaranteeClient.send(pattern, payload);
  }

  getIndemnityById(id: string) {
    const pattern = { cmd: 'get-indemnity-by-id' };
    const payload = Number(id);
    return this.guaranteeClient.send(pattern, payload);
  }
}
