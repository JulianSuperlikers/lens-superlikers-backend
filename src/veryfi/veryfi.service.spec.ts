import { Test, TestingModule } from '@nestjs/testing';
import { VeryfiService } from './veryfi.service';

describe('VeryfiService', () => {
  let service: VeryfiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VeryfiService],
    }).compile();

    service = module.get<VeryfiService>(VeryfiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
