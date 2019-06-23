import { HttpException, Injectable } from '@nestjs/common';
import { compile } from 'handlebars';
import * as converter from 'json-2-csv';
import * as chromeModule from 'puppeteer';

import { CompileHandlebarsDtoResponse, PdfDto } from './file.dto';

@Injectable()
export class FileService {
  private readonly chromeArgs: string[] = ['--no-sandbox', '--disable-setuid-sandbox', '--headless', '--disable-gpu'];

  async generatePdf(data: PdfDto) {
    const browser: chromeModule.Browser = await chromeModule.launch({
      args: this.chromeArgs,
      executablePath: process.env.CHROME_BIN || null,
      headless: true,
    });
    const page: chromeModule.Page = await browser.newPage();
    await page.setContent(data.html);
    const bufferPdf: Buffer = await page.pdf({
      format: data.pageFormat || 'A4',
      printBackground: data.printBackground,
      landscape: data.landscape,
      headerTemplate: data.header,
      displayHeaderFooter: !!data.footer || !!data.header,
      footerTemplate: data.footer,
    });
    await page.close();
    await browser.close();
    return bufferPdf;
  }

  async jsonToCsv(json: any): Promise<string> {
    return await converter.json2csvAsync(json);
  }

  async csvToJson(data: string) {
    return await converter.csv2jsonAsync(data);
  }

  hbs(hbs: string, data: any): CompileHandlebarsDtoResponse {
    try {
      const template = compile(hbs);
      return {
        html: template(data),
      };
    } catch (e) {
      throw new HttpException(
        {
          name: 'Error hbs',
          message: e.message,
        },
        500,
      );
    }
  }
}
