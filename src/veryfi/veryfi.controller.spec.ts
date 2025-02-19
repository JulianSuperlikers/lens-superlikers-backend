import { Test, TestingModule } from '@nestjs/testing';
import { VeryfiController } from './veryfi.controller';
import { VeryfiService } from './veryfi.service';

describe('VeryfiController', () => {
  let controller: VeryfiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VeryfiController],
      providers: [VeryfiService],
    }).compile();

    controller = module.get<VeryfiController>(VeryfiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
