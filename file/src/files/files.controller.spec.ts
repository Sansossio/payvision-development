import { Test, TestingModule } from '@nestjs/testing';
import { FilesController } from './files.controller';
import { FileService } from './files.service';

describe('Files Controller', () => {
  let controller: FilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileService],
      controllers: [FilesController],
    }).compile();

    controller = module.get<FilesController>(FilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Json to csv', async () => {
    const response = await controller.jsonToCsv({
      json: [
        {
          name: 'payvision',
        },
        {
          name: 'sansossio',
        },
      ],
    });
    expect.stringContaining(response);
  });

  it('csv to json', async () => {
    const response = await controller.csvToJson({
      csv: 'name\njulio',
    });
    expect.objectContaining(response);
  });

  it('Compile hbs', async () => {
    const response = await controller.compile({
      template: 'Hello {{name}}',
      data: {
        name: 'Payvision',
      },
    });
    expect(response.html).toEqual('Hello Payvision');
  });

  it('Convert html to pdf', async () => {
    const response = await controller.htmlToPdf({
      html: '<html>Hello world</html>',
    });
    expect(typeof response.pdf).toBe('string');
  });
});
