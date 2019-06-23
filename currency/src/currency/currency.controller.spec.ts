import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';
import { BadRequestException } from '@nestjs/common';

describe('Currency Controller', () => {
  let controller: CurrencyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrencyController],
      providers: [CurrencyService],
    }).compile();

    controller = module.get<CurrencyController>(CurrencyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Convert EUR to USD', async () => {
    const response = await controller.converter({
      base: 'EUR',
      to: 'USD',
      amount: 100,
    });
    expect(response).toHaveProperty('currency', 'USD');
    expect(response.amount).not.toBeNaN();
    expect(response.rate).not.toBeNaN();
  });

  it('Same currencies', async () => {
    try {
      await controller.converter({
        base: 'EUR',
        to: 'EUR',
        amount: 100,
      });
      throw new Error();
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
    }
  });
});
