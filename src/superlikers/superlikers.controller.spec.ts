import { Test, TestingModule } from '@nestjs/testing';
import { SuperlikersController } from './superlikers.controller';
import { SuperlikersService } from './superlikers.service';

describe('SuperlikersController', () => {
  let controller: SuperlikersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperlikersController],
      providers: [SuperlikersService],
    }).compile();

    controller = module.get<SuperlikersController>(SuperlikersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
