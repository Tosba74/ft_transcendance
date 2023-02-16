import { Test, TestingModule } from '@nestjs/testing';
import { FriendTypesController } from './friend_types.controller';

describe('FriendTypesController', () => {
  let controller: FriendTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FriendTypesController],
    }).compile();

    controller = module.get<FriendTypesController>(FriendTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
