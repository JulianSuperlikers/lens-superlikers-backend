import { Test, TestingModule } from '@nestjs/testing';
import { HttpClientBase } from './http-client-base.service';

describe('HttpClientBase', () => {
  let service: HttpClientBase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpClientBase],
    }).compile();

    service = module.get<HttpClientBase>(HttpClientBase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
