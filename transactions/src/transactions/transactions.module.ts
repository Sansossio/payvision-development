import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { MailerService } from '../mailer/mailer.service';

@Module({
  providers: [TransactionsService, MailerService],
  controllers: [TransactionsController],
  exports: [TransactionsService],
})
export class TransactionsModule {}
