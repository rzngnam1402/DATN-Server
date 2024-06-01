import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'APPLICATION_CLIENT',
        transport: Transport.TCP,
        options: {
          host: 'application-service',
          port: 8889,
        },
      },
    ]),
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
