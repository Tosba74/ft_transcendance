import { Test, TestingModule } from '@nestjs/testing';
import { ChatParticipantsController } from './chat_participants.controller';

describe('ChatParticipantsController', () => {
  let controller: ChatParticipantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatParticipantsController],
    }).compile();

    controller = module.get<ChatParticipantsController>(ChatParticipantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
