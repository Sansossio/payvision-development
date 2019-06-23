import { Controller, Get, Query, Header, Res } from '@nestjs/common';
import { ReportService } from './report.service';
import { ApiOperation, ApiUseTags, ApiOkResponse } from '@nestjs/swagger';
import { TransactionsRequestDto } from '../transactions/transactions.dto';
import { ReportDtoResponse } from './report.dto';
import { Readable } from 'stream';
import { Response } from 'express';

@Controller('report')
@ApiUseTags('Reports')
export class ReportController {
  constructor(private readonly service: ReportService) {}

  @Get()
  @ApiOperation({
    title: 'Transactions reports',
    description: 'Get report by a list of transactions',
  })
  @ApiOkResponse({
    type: ReportDtoResponse,
  })
  async report(@Query() params: TransactionsRequestDto) {
    return await this.service.generate(params);
  }

  @Get('pdf')
  @ApiOperation({
    title: 'Download pdf from report',
  })
  @Header('Content-Type', 'application/pdf')
  async csv(@Query() params: TransactionsRequestDto, @Res() res: Response) {
    const pdf = await this.service.pdf(params);
    const stream = new Readable();
    stream.push(pdf);
    stream.push(null);
    stream.pipe(res);
  }
}
