import { ApiResponseModelProperty } from '@nestjs/swagger';
import { TransactionsResponseDto } from '../transactions/transactions.dto';

export class ReportDtoByCurrenciesResponse {
  @ApiResponseModelProperty()
  currency: string;

  @ApiResponseModelProperty()
  total: number;
}

export class ReportDtoByTotalAmountsResponse {
  @ApiResponseModelProperty()
  currency: string;

  @ApiResponseModelProperty()
  total: number;
}

export class ReportDtoByActionsResponse {
  @ApiResponseModelProperty()
  action: string;

  @ApiResponseModelProperty()
  transactions: number;

  @ApiResponseModelProperty()
  amounts: ReportDtoByTotalAmountsResponse[];
}

export class ReportDtoResponse {
  @ApiResponseModelProperty()
  totalTransactions: number;

  @ApiResponseModelProperty()
  totalCards: number;

  @ApiResponseModelProperty()
  currencies: string[];

  @ApiResponseModelProperty({
    type: [ReportDtoByActionsResponse],
  })
  totalByActions: ReportDtoByActionsResponse[];

  @ApiResponseModelProperty({
    type: [ReportDtoByCurrenciesResponse],
  })
  totalByCurrencies: ReportDtoByCurrenciesResponse[];

  @ApiResponseModelProperty({
    type: [ReportDtoByTotalAmountsResponse],
  })
  sumTotal: ReportDtoByTotalAmountsResponse[];

  @ApiResponseModelProperty({
    type: [TransactionsResponseDto],
  })
  transactions: TransactionsResponseDto[];
}
