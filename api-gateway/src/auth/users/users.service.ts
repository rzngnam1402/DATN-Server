import { Headers, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(@Inject('AUTH_CLIENT') private authClient: ClientProxy) {}

  getMe(@Headers('authorization') authHeader: string) {
    const pattern = { cmd: 'get-me' };
    let token: string;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
    return this.authClient.send(pattern, token);
  }

  // getAll(@Headers('authorization') authHeader: string) {
  //   const pattern = { cmd: 'get-me' };
  //   let token: string;
  //   if (authHeader && authHeader.startsWith('Bearer ')) {
  //     token = authHeader.substring(7);
  //   }
  //   return this.authClient.send(pattern, token);
  // }
}
