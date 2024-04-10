import { Module } from '@nestjs/common';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { GuaranteeController } from './guarantee.controller';
import { GuaranteeService } from './guarantee.service';

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
  controllers: [GuaranteeController],
  providers: [GuaranteeService],
})
export class GuaranteeModule {}
