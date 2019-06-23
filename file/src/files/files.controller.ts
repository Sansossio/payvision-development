import { Controller, Post, Res, Header, Body } from '@nestjs/common';
import { FileService } from './files.service';
import { ApiOperation, ApiUseTags, ApiOkResponse } from '@nestjs/swagger';
import { PdfDto, JsonToCsvDto, CsvToJsonDto, CompileHandlebarsDtoResponse, CompileHandlebarsDto, PdfResponse } from './file.dto';
import { Response } from 'express';

@Controller()
export class FilesController {
  constructor(private readonly service: FileService) {}

  @Post('pdf')
  @ApiOperation({
    title: 'Convert html to pdf',
    description: 'Response as base64',
  })
  @ApiOkResponse({
    type: PdfResponse,
  })
  @ApiUseTags('Pdf')
  async htmlToPdf(@Body() body: PdfDto): Promise<PdfResponse> {
    const pdfBuffer: Buffer = await this.service.generatePdf(body);
    const pdf = pdfBuffer.toString('base64');
    return {
      pdf,
    };
  }

  @Post('convert/json')
  @ApiOperation({
    title: 'Convert json to csv format',
  })
  @ApiOkResponse({
    type: String,
  })
  @ApiUseTags('CSV')
  async jsonToCsv(@Body() { json }: JsonToCsvDto) {
    return await this.service.jsonToCsv(json);
  }

  @Post('convert/csv')
  @ApiOperation({
    title: 'Convert csv to json format',
  })
  @ApiOkResponse({
    type: Object,
  })
  @ApiUseTags('CSV')
  async csvToJson(@Body() { csv }: CsvToJsonDto) {
    return await this.service.csvToJson(csv);
  }

  @Post('hbs')
  @ApiOperation({
    title: 'Compile hbs',
  })
  @ApiOkResponse({ type: CompileHandlebarsDtoResponse })
  compile(@Body() body: CompileHandlebarsDto) {
    return this.service.hbs(body.template, body.data);
  }
}
