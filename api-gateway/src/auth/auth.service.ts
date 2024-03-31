import { Inject, Injectable, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_CLIENT') private authClient: ClientProxy) {}

  pingAuthService() {
    const startTs = Date.now();
    const pattern = { cmd: 'ping' };
    const payload = {};
    return this.authClient
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - startTs })),
      );
  }

  signup(@Req() data: Request) {
    const pattern = { cmd: 'signup' };
    const payload = data.body;
    return this.authClient.send(pattern, payload);
  }

  signin(@Req() data: Request) {
    const pattern = { cmd: 'signin' };
    const payload = data.body;
    return this.authClient.send(pattern, payload);
  }
}
