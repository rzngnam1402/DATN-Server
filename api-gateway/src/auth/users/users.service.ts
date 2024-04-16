import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(@Inject('AUTH_CLIENT') private authClient: ClientProxy) {}

  getMe(token: string) {
    const pattern = { cmd: 'get-me' };
    const payload = token;
    return this.authClient.send(pattern, payload);
  }

  getAll() {
    const pattern = { cmd: 'get-all-user' };
    const payload = {};
    return this.authClient.send(pattern, payload);
  }

  addSignature(data: Request) {
    const pattern = { cmd: 'add-signature' };
    const payload = data.body;
    return this.authClient.send(pattern, payload);
  }

  getSignature(data: Request) {
    const pattern = { cmd: 'get-signature' };
    const payload = data.body;
    return this.authClient.send(pattern, payload);
  }
}
