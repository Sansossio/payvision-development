import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { RequestModule } from './request/request.module';
import { TransactionsModule } from './transactions/transactions.module';
import { MailerService } from './mailer/mailer.service';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    ConfigModule,
    RequestModule,
    TransactionsModule,
    ReportModule,
  ],
  providers: [AppService, MailerService],
})
export class AppModule {}
