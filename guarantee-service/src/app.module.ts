import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PdfGeneratorModule } from './pdf-generator/pdf-generator.module';
import { FirebaseModule } from './firebase/firebase.module';
import { GuaranteeService } from './guarantee/guarantee.service';
import { GuaranteeModule } from './guarantee/guarantee.module';
import { PrismaModule } from './prisma/prisma.module';
import { BsignModule } from './bsign/bsign.module';
import { EmailModule } from './email/email.module';
import { IndemnityModule } from './indemnity/indemnity.module';
import { IndemnityService } from './indemnity/indemnity.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PdfGeneratorModule,
    FirebaseModule,
    GuaranteeModule,
    PrismaModule,
    BsignModule,
    EmailModule,
    IndemnityModule,
  ],
  controllers: [AppController],
  providers: [AppService, GuaranteeService, IndemnityService],
})
export class AppModule {}
