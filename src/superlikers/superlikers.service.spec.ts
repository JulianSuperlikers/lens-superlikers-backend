import { Test, TestingModule } from '@nestjs/testing';
import { SuperlikersService } from './superlikers.service';

describe('SuperlikersService', () => {
  let service: SuperlikersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperlikersService],
    }).compile();

    service = module.get<SuperlikersService>(SuperlikersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
