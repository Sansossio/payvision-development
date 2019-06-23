import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { CurrencyModule } from './currency/currency.module';
import { RequestModule } from './request/request.module';

@Module({
  imports: [ConfigModule, RequestModule, CurrencyModule],
  providers: [AppService],
})
export class AppModule {}
