import { Controller, Get, Query, Param, Header, Res, HttpCode } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { ApiUseTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { TransactionsRequestDto, TransactionsResponseDto, TransactionsRequestIdDto, TransactionsRequestEmailDto } from './transactions.dto';
import { Response } from 'express';
import { Readable } from 'stream';

@Controller('transactions')
@ApiUseTags('Transactions')
export class TransactionsController {
  constructor(private readonly service: TransactionsService) {}

  @Get()
  @ApiOperation({
    title: 'Get transactions',
    description: 'Get transactions list',
  })
  @ApiOkResponse({
    type: [TransactionsResponseDto],
  })
  async get(@Query() params: TransactionsRequestDto) {
    return await this.service.get(params);
  }

  @Get('csv')
  @ApiOperation({
    title: 'Download csv from transactions',
  })
  @Header('Content-Type', 'application/octet-stream')
  async csv(@Query() params: TransactionsRequestDto, @Res() res: Response) {
    const csv = await this.service.csv(params);
    res.attachment('transactions.csv');
    const stream = new Readable();
    stream.push(csv);
    stream.push(null);
    stream.pipe(res);
  }

  @Get('send-email')
  @ApiOperation({
    title: 'Send transaction information to email',
  })
  @HttpCode(204)
  async email(@Query() { email, id }: TransactionsRequestEmailDto) {
    await this.service.sendToEmail(email, id);
  }

  @Get(':id/pdf')
  @ApiOperation({
    title: 'Download transaction as pdf',
  })
  @ApiOkResponse({
    type: TransactionsResponseDto,
  })
  @Header('Content-Type', 'application/pdf')
  async download(@Param() { id }: TransactionsRequestIdDto, @Res() res: Response) {
    const pdf = await this.service.download(id);
    const stream = new Readable();
    stream.push(pdf);
    stream.push(null);
    stream.pipe(res);
  }

  @Get(':id')
  @ApiOperation({
    title: 'Get transaction by id',
  })
  @ApiOkResponse({
    type: TransactionsResponseDto,
  })
  async getById(@Param() { id }: TransactionsRequestIdDto) {
    return await this.service.getById(id);
  }
}
