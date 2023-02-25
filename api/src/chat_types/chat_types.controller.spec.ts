import { Test, TestingModule } from '@nestjs/testing';
import { ChatTypesController } from './chat_types.controller';

describe('ChatTypesController', () => {
  let controller: ChatTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatTypesController],
    }).compile();

    controller = module.get<ChatTypesController>(ChatTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
