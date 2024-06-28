import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';

@Injectable()
export class IndemnityService {
  constructor(
    @Inject('GUARANTEE_CLIENT') private guaranteeClient: ClientProxy,
  ) {}

  createNewIndemnity(req: Request, relatedFile: Express.Multer.File) {
    const pattern = { cmd: 'create-new-indemnity' };
    const guarantee_id = req.body.guarantee_id;
    const reason = req.body.reason;
    const payload = { guarantee_id, reason, relatedFile };
    return this.guaranteeClient.send(pattern, payload);
  }

  getAllIndemnitiesClient(user: any) {
    const pattern = { cmd: 'get-all-indemnities-client' };
    const payload = user.email;
    return this.guaranteeClient.send(pattern, payload);
  }

  getAllIndemnitiesBanker(user: any) {
    const pattern = { cmd: 'get-all-indemnities-banker' };
    const payload = user.company;
    return this.guaranteeClient.send(pattern, payload);
  }

  getIndemnityById(id: string) {
    const pattern = { cmd: 'get-indemnity-by-id' };
    const payload = Number(id);
    return this.guaranteeClient.send(pattern, payload);
  }

  updateIndemnityById(id: string, data: Request) {
    const pattern = { cmd: 'update-indemnity-by-id' };
    const payload = { id: Number(id), data: data.body };
    return this.guaranteeClient.send(pattern, payload);
  }
}
