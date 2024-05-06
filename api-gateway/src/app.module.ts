import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ApplicationModule } from './application/application.module';
import { UsersModule } from './auth/users/users.module';
import { GuaranteeModule } from './guarantee/guarantee.module';
import { IndemnityModule } from './indemnity/indemnity.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ApplicationModule,
    UsersModule,
    GuaranteeModule,
    IndemnityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
