import { Test, TestingModule } from '@nestjs/testing';
import { RequestService } from './request.service';
import { ConfigService } from '../config/config.service';

describe('RequestService', () => {
  let service: RequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestService, ConfigService],
    }).compile();

    service = module.get<RequestService>(RequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
