import { ApiModelPropertyOptional, ApiResponseModelProperty, ApiModelProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsString, IsNotEmpty, IsEmail } from 'class-validator';

const actionCodes = ['payment', 'credit'];
const currencyCodes = ['EUR', 'USD', 'JPY'];

export class TransactionsRequestIdDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class TransactionsRequestEmailDto {
  @ApiModelProperty({
    description: 'Transaction id',
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiModelProperty({
    description: 'Email to send transaction information',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class TransactionsRequestDto {
  @ApiModelPropertyOptional({
    enum: actionCodes,
  })
  @IsOptional()
  @IsEnum(actionCodes)
  action?: string;

  @ApiModelPropertyOptional({
    enum: currencyCodes,
  })
  @IsOptional()
  @IsEnum(currencyCodes)
  currency?: string;
}

export class TransactionsRequestCardDetailsDto {
  @ApiResponseModelProperty()
  type: string;

  @ApiResponseModelProperty()
  parsedNumber: string;
}

export class TransactionsResponseCardDto {
  @ApiResponseModelProperty()
  expiryMonth: string;

  @ApiResponseModelProperty()
  expiryYear: string;

  @ApiResponseModelProperty()
  firstSixDigits: string;

  @ApiResponseModelProperty()
  lastFourDigits: string;

  @ApiResponseModelProperty()
  holderName: string;

  @ApiResponseModelProperty({
    type: TransactionsRequestCardDetailsDto,
  })
  details: TransactionsRequestCardDetailsDto;
}

export class TransactionsResponseDto {
  @ApiResponseModelProperty()
  id: string;

  @ApiResponseModelProperty()
  action: string;

  @ApiResponseModelProperty()
  amount: number;

  @ApiResponseModelProperty()
  brandId: string;

  @ApiResponseModelProperty()
  currencyCode: string;

  @ApiResponseModelProperty()
  trackingCode: string;

  @ApiResponseModelProperty({
    type: TransactionsResponseCardDto,
  })
  card: TransactionsResponseCardDto;
}
