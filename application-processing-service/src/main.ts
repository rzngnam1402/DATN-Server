import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.enableCors();
//   app.connectMicroservice<MicroserviceOptions>({
//     transport: Transport.RMQ,
//     options: {
//       urls: [
//         'amqps://qjhoubol:O9nigZMk8fyzVI8KwS4AWeH0NMPeVDvp@moose.rmq.cloudamqp.com/qjhoubol',
//       ], // main queue
//       queue: 'main_queue',
//       queueOptions: {
//         durable: false,
//       },
//     },
//   });
//   await app.listen(3333);
// }

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3333);
}
bootstrap();
