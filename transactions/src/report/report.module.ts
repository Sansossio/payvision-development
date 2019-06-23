import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { MailerService } from '../mailer/mailer.service';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
  imports: [TransactionsModule],
  providers: [ReportService, MailerService],
  controllers: [ReportController],
})
export class ReportModule {}
