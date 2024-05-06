import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { IndemnityController } from './indemnity.controller';
import { IndemnityService } from './indemnity.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'GUARANTEE_CLIENT',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8890,
        },
      },
    ]),
  ],
  controllers: [IndemnityController],
  providers: [IndemnityService],
})
export class IndemnityModule {}
