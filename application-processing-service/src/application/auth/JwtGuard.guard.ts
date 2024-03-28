import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          'amqps://qjhoubol:O9nigZMk8fyzVI8KwS4AWeH0NMPeVDvp@moose.rmq.cloudamqp.com/qjhoubol',
        ],
        queue: 'main_queue',
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    const verificationResponse = await this.client
      .send<
        { isValid: boolean; decoded?: any },
        { token: string }
      >({ role: 'auth', cmd: 'verifyToken' }, { token })
      .toPromise();

    if (!verificationResponse.isValid) {
      throw new UnauthorizedException('Invalid token');
    }

    request.user = verificationResponse.decoded; // Attach user information to the request
    return true;
  }
}
