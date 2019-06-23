import { Injectable, HttpException } from '@nestjs/common';
import * as rp from 'request-promise';

@Injectable()
export class RequestService {
  async request<T>(options: rp.OptionsWithUri): Promise<T> {
    if (options.json === undefined) {
      options.json = true;
    }
    try {
      return await (rp(options) as any);
    } catch (e) {
      throw new HttpException(e.error, e.statusCode);
    }
  }
}
