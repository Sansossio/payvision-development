import { ApiModelProperty, ApiResponseModelProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

const availableCurrencies = ['EUR', 'USD', 'JPY', 'GBP', 'SEK', 'CAD'];

export class CurrencyRequestDto {
  @ApiModelProperty({
    description: 'Initial currency',
    enum: availableCurrencies,
  })
  @IsNotEmpty()
  @IsEnum(availableCurrencies)
  base: string;

  @ApiModelProperty({
    description: 'Amount to convert',
  })
  @IsNotEmpty()
  amount: number;

  @ApiModelProperty({
    description: 'Final currency',
    enum: availableCurrencies,
  })
  @IsNotEmpty()
  @IsEnum(availableCurrencies)
  to: string;
}

export class CurrencyResponseDto {
  @ApiResponseModelProperty()
  currency: string;

  @ApiResponseModelProperty()
  amount: number;

  @ApiResponseModelProperty()
  rate: number;
}
