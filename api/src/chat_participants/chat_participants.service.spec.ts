import { Test, TestingModule } from '@nestjs/testing';
import { ChatParticipantsService } from './chat_participants.service';

describe('ChatParticipantsService', () => {
  let service: ChatParticipantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatParticipantsService],
    }).compile();

    service = module.get<ChatParticipantsService>(ChatParticipantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
