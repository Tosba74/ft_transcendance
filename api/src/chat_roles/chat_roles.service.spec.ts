import { Test, TestingModule } from '@nestjs/testing';
import { ChatRolesService } from './chat_roles.service';

describe('ChatRolesService', () => {
  let service: ChatRolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatRolesService],
    }).compile();

    service = module.get<ChatRolesService>(ChatRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
