import { Test, TestingModule } from '@nestjs/testing';
import { FriendTypesService } from './friend_types.service';

describe('FriendTypesService', () => {
  let service: FriendTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FriendTypesService],
    }).compile();

    service = module.get<FriendTypesService>(FriendTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
