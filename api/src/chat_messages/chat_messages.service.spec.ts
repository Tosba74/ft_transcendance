import { Test, TestingModule } from '@nestjs/testing';
import { ChatMessagesService } from './chat_messages.service';

describe('ChatMessagesService', () => {
  let service: ChatMessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatMessagesService],
    }).compile();

    service = module.get<ChatMessagesService>(ChatMessagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
