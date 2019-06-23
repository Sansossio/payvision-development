import { Injectable, BadRequestException } from '@nestjs/common';
import { RequestService } from '../request/request.service';
import { CurrencyRequestDto, CurrencyResponseDto } from './currency.dto';
import { OptionsWithUri } from 'request-promise';
import { ConfigService } from '../config/config.service';
import { get } from 'lodash';

@Injectable()
export class CurrencyService {
  private readonly request = new RequestService();
  private readonly config = new ConfigService();
  private readonly endpoint = this.config.get<string>('currencyApi.endpoint');

  async converter(query: CurrencyRequestDto): Promise<CurrencyResponseDto> {
    if (query.to === query.base) {
      throw new BadRequestException('Base and to must a be different');
    }
    const options: OptionsWithUri = {
      uri: this.endpoint,
      qs: {
        base: query.base,
      },
    };
    const data = await this.request.request(options);
    const rate: number = get(data, `rates.${query.to}`, 0);
    return {
      currency: query.to,
      amount: query.amount * rate,
      rate,
    };
  }
}
