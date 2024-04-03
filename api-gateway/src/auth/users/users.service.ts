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
}
