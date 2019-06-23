import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { RequestService } from '../request/request.service';
import { OptionsWithUri } from 'request-promise';
import { TransactionsRequestDto, TransactionsResponseDto } from './transactions.dto';
import { join } from 'path';
import { readFile } from 'fs';
import { MailerService } from '../mailer/mailer.service';
import { getTemplate } from '../app.utils';

@Injectable()
export class TransactionsService {
  constructor(private readonly request: RequestService, private readonly mailer: MailerService) {}

  private cardType(transaction: TransactionsResponseDto): string {
    const number = transaction.card.firstSixDigits;
    const regexs = [
      {
        regex: /^4/,
        type: 'Visa',
      },
      {
        regex: /^5[1-5]/,
        type: 'Mastercard',
      },
      {
        regex: /^3[47]/,
        type: 'AMEX',
      },
      {
        regex: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
        type: 'Discover',
      },
      {
        regex: /^36/,
        type: 'Diners',
      },
      {
        regex: /^30[0-5]/,
        type: 'Diners - Carte Blanche',
      },
      {
        regex: /^35(2[89]|[3-8][0-9])/,
        type: 'JCB',
      },
      {
        regex: /^(4026|417500|4508|4844|491(3|7))/,
        type: 'Visa Electron',
      },
    ];
    for (const { regex, type } of regexs) {
      if (number.match(regex)) {
        return type;
      }
    }

    return 'unknow';
  }

  private parseCardNumber(transaction: TransactionsResponseDto): string {
    const {
      card: { firstSixDigits, lastFourDigits },
    } = transaction;
    const number = `${firstSixDigits}******${lastFourDigits}`;
    let response = '';
    for (let i = 0; i < number.length; i++) {
      if (i % 4 === 0) {
        response += ' ';
      }
      response += number[i];
    }
    return response.trim();
  }

  async get(params: TransactionsRequestDto) {
    const options: OptionsWithUri = {
      uri: 'transactions',
      method: 'GET',
      qs: {
        action: params.action,
        currencyCode: params.currency,
      },
    };
    const transactions = await this.request.payvisionRequest<TransactionsResponseDto[]>(options);
    return transactions.map((t: TransactionsResponseDto) => ({
      ...t,
      card: {
        ...t.card,
        details: {
          type: this.cardType(t),
          parsedNumber: this.parseCardNumber(t),
        },
      },
    }));
  }

  async csv(params: TransactionsRequestDto): Promise<Buffer> {
    const listing = await this.get(params);
    const csvData = await this.request.fileRequest<string>({
      uri: 'convert/json',
      method: 'POST',
      body: {
        json: listing,
      },
    });
    return Buffer.from(csvData);
  }

  /*
    This method is not efficient, because I dont have a specific method to get one transaction by id
    But, I need this method to get one transaction for others methods (like pdf, email, favorites etc...)
  */
  async getById(id: string) {
    const all = await this.get({});
    const transaction = all.find(t => t.trackingCode === id || t.id === id);
    if (!transaction) {
      throw new NotFoundException();
    }
    return transaction;
  }

  async sendToEmail(email: string, id: string): Promise<void> {
    const instance = await this.getById(id);
    const pdf = await this.download(id, instance);
    await this.mailer.send({
      to: email,
      subject: 'Your transaction',
      html: await getTemplate('transaction-email.html'),
      attachments: [
        {
          filename: 'transaction.pdf',
          content: pdf,
        },
      ],
    });
  }

  async download(id: string, instance?: TransactionsResponseDto) {
    instance = instance || (await this.getById(id));
    const template = await getTemplate('transaction.hbs');
    return this.request.hbsToPdf(template, instance);
  }
}
