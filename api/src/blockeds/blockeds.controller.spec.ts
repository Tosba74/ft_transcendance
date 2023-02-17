import { Test, TestingModule } from '@nestjs/testing';
import { BlockedsController } from './blockeds.controller';

describe('BlockedsController', () => {
  let controller: BlockedsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlockedsController],
    }).compile();

    controller = module.get<BlockedsController>(BlockedsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
