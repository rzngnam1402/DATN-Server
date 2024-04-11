import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PdfGeneratorModule } from './pdf-generator/pdf-generator.module';
import { FirebaseModule } from './firebase/firebase.module';
import { GuaranteeService } from './guarantee/guarantee.service';
import { GuaranteeModule } from './guarantee/guarantee.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PdfGeneratorModule,
    FirebaseModule,
    GuaranteeModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService, GuaranteeService],
})
export class AppModule {}
