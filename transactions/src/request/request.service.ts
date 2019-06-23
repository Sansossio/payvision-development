import { Injectable, HttpException } from '@nestjs/common';
import * as rp from 'request-promise';
import { ConfigService } from '../config/config.service';

@Injectable()
export class RequestService {
  private readonly endpoint = this.config.get<string>('api.endpoint');
  private readonly username = this.config.get<string>('api.credentials.username');
  private readonly password = this.config.get<string>('api.credentials.password');
  private readonly fileService = this.config.get<string>('services.file.endpoint');
  private readonly currencyService = this.config.get<string>('services.currency.endpoint');

  constructor(private readonly config: ConfigService) {}

  private async request<T>(options: rp.OptionsWithUri): Promise<T> {
    if (options.json === undefined) {
      options.json = true;
    }
    try {
      return await (rp(options) as any);
    } catch (e) {
      throw new HttpException(e.error, e.statusCode);
    }
  }

  async payvisionRequest<T>(options: rp.OptionsWithUri) {
    options.uri = `${this.endpoint}/${options.uri}`;
    options.auth = {
      username: this.username,
      password: this.password,
    };
    return await this.request<T>(options);
  }

  async hbsToPdf(template: string, data: any) {
    // Compile hbs
    const { html } = await this.fileRequest<{ html: string }>({
      uri: `hbs`,
      method: 'POST',
      body: {
        template,
        data,
      },
    });
    const { pdf } = await this.fileRequest({
      uri: 'pdf',
      method: 'POST',
      body: {
        html,
        printBackground: true,
      },
    });
    return Buffer.from(pdf, 'base64');
  }

  async fileRequest<T>(options: rp.OptionsWithUri) {
    options.uri = `${this.fileService}/${options.uri}`;
    return await this.request<T>(options);
  }

  async currencyRequest<T>(options: rp.OptionsWithUri) {
    options.uri = `${this.currencyService}/${options.uri}`;
    return await this.request<T>(options);
  }
}
