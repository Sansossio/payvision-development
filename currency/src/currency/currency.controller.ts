import { Controller, Get, Query } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { CurrencyRequestDto, CurrencyResponseDto } from './currency.dto';
import { CurrencyService } from './currency.service';

@Controller()
@ApiUseTags('Currency')
export class CurrencyController {
  constructor(private readonly service: CurrencyService) {}

  @Get('converter')
  @ApiOperation({
    title: 'Currencies converter',
  })
  @ApiOkResponse({
    type: CurrencyResponseDto,
  })
  async converter(@Query() query: CurrencyRequestDto) {
    return await this.service.converter(query);
  }
}
