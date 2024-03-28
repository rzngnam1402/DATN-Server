import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqps://qjhoubol:O9nigZMk8fyzVI8KwS4AWeH0NMPeVDvp@moose.rmq.cloudamqp.com/qjhoubol',
      ], // main queue
      queue: 'main_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  // await app.startAllMicroservices();
  await app.listen(3333);

  console.log('Api Gateway is running');
}
bootstrap();
