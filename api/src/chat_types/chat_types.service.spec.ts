import { Test, TestingModule } from '@nestjs/testing';
import { ChatTypesService } from './chat_types.service';

describe('ChatTypesService', () => {
  let service: ChatTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatTypesService],
    }).compile();

    service = module.get<ChatTypesService>(ChatTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
