import { ApiModelProperty, ApiModelPropertyOptional, ApiResponseModelProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator';
import { PDFFormat } from 'puppeteer';

export class PdfResponse {
  @ApiResponseModelProperty()
  pdf: string;
}
export class PdfDto {
  @ApiModelProperty()
  @IsString()
  html: string;

  @ApiModelPropertyOptional()
  @IsString()
  @IsOptional()
  header?: string;

  @ApiModelPropertyOptional()
  @IsString()
  @IsOptional()
  footer?: string;

  @ApiModelProperty({
    example: 'A4',
  })
  @IsString()
  @IsOptional()
  pageFormat?: PDFFormat;

  @ApiModelPropertyOptional({
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  printBackground?: boolean;

  @ApiModelPropertyOptional({
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  landscape?: boolean;
}

export class JsonToCsvDto {
  @ApiModelProperty()
  @IsNotEmpty()
  json: any;
}

export class CsvToJsonDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  csv: any;
}

export class CompileHandlebarsDto {
  @ApiModelProperty({
    example: '<html>Hello <b>{{name}}</b></html>',
  })
  @IsString()
  template: string;

  @ApiModelProperty({
    example: {
      name: 'Payvision',
    },
  })
  @IsNotEmpty()
  data: Object;
}

export class CompileHandlebarsDtoResponse {
  @ApiResponseModelProperty()
  html: string;
}
