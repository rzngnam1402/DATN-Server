import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
// import { map } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('AUTH_SERVICE') private authService: ClientProxy) {}

  // pingAuthService() {
  //   const startTs = Date.now();
  //   const pattern = { cmd: 'ping' };
  //   const payload = {};
  //   return this.authService
  //     .send<string>(pattern, payload)
  //     .pipe(
  //       map((message: string) => ({ message, duration: Date.now() - startTs })),
  //     );
  // }
  async pingAuthService() {
    // this.authService.emit('ping', 'hello from RabbitMQ');
    console.log('ping authentication service');
    try {
      this.authService.send('ping', 'Hello from RabbitMQ');
    } catch (err) {
      console.log(err);
    }
    return 'ping authentication service!';
  }
}
