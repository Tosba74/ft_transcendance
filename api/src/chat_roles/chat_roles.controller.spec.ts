import { Test, TestingModule } from '@nestjs/testing';
import { ChatRolesController } from './chat_roles.controller';

describe('ChatRolesController', () => {
  let controller: ChatRolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatRolesController],
    }).compile();

    controller = module.get<ChatRolesController>(ChatRolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
