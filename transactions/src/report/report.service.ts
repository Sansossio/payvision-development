import { Injectable } from '@nestjs/common';
import { TransactionsService } from '../transactions/transactions.service';
import { TransactionsRequestDto, TransactionsResponseDto } from '../transactions/transactions.dto';
import * as _ from 'lodash';
import { RequestService } from '../request/request.service';
import { ReportDtoByCurrenciesResponse, ReportDtoResponse, ReportDtoByTotalAmountsResponse, ReportDtoByActionsResponse } from './report.dto';
import { getTemplate } from '../app.utils';

@Injectable()
export class ReportService {
  constructor(private readonly transactionService: TransactionsService, private readonly request: RequestService) {}

  private separeByCurrencies(transactions: TransactionsResponseDto[]) {
    const response: ReportDtoByCurrenciesResponse[] = [];
    for (const item of transactions) {
      const { currencyCode, amount } = item;
      const findObj = response.find(t => t.currency === currencyCode);
      if (findObj) {
        findObj.total += amount;
        continue;
      }
      response.push({
        currency: currencyCode,
        total: amount,
      });
    }
    return response;
  }

  private separeByActions(transactions: TransactionsResponseDto[]) {
    const response: ReportDtoByActionsResponse[] = [];
    const actions = _.groupBy(transactions, t => t.action);
    for (const action in actions) {
      const value = actions[action];
      response.push({
        action,
        transactions: value.length,
        amounts: this.separeByCurrencies(value),
      });
    }
    return response;
  }

  private async sumTotal(items: ReportDtoByCurrenciesResponse[]) {
    const response: ReportDtoByTotalAmountsResponse[] = [];
    for (const item of items) {
      let total = item.total;
      const otherItems = items.filter(i => i.currency !== item.currency);
      for (const other of otherItems) {
        const { amount } = await this.request.currencyRequest({
          uri: 'converter',
          method: 'GET',
          qs: {
            base: other.currency,
            amount: other.total,
            to: item.currency,
          },
        });
        total += amount;
      }
      response.push({
        currency: item.currency,
        total,
      });
    }
    return response;
  }

  async generate(params: TransactionsRequestDto): Promise<ReportDtoResponse> {
    const transactions = await this.transactionService.get(params);
    const separeByCard = _.groupBy(transactions, t => t.card.holderName);
    const totalByCurrencies = this.separeByCurrencies(transactions);
    const totalCards = Object.keys(separeByCard).length;
    return {
      totalTransactions: transactions.length,
      totalCards,
      currencies: [...new Set(transactions.map(t => t.currencyCode))],
      totalByActions: this.separeByActions(transactions),
      totalByCurrencies,
      sumTotal: await this.sumTotal(totalByCurrencies),
      transactions,
    };
  }

  async pdf(params: TransactionsRequestDto): Promise<Buffer> {
    const data = await this.generate(params);
    const template = await getTemplate('report.hbs');
    for (const totals of data.sumTotal) {
      totals.total = +totals.total.toFixed(2);
    }
    return await this.request.hbsToPdf(template, data);
  }
}
