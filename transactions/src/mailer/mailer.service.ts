import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '../config/config.service';
import { MailOptions } from 'nodemailer/lib/stream-transport';

@Injectable()
export class MailerService {
  private readonly host = this.config.get<string>('services.mailer.host');
  private readonly port = this.config.get<number>('services.mailer.port');
  private readonly ssl = this.config.get<boolean>('services.mailer.ssl');
  private readonly username = this.config.get<string>('services.mailer.username');
  private readonly password = this.config.get<string>('services.mailer.password');

  constructor(
    private readonly config: ConfigService,
  ) {}

  async send(options: MailOptions) {
    const mailer = nodemailer.createTransport({
      host: this.host,
      port: this.port,
      secure: this.ssl,
      auth: {
        user: this.username,
        pass: this.password,
      },
    });
    try {
      await mailer.sendMail(options);
    } catch (e) {
      throw new InternalServerErrorException('Error sending email');
    }
  }
}
