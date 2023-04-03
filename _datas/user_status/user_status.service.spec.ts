import { Test, TestingModule } from '@nestjs/testing';
import { UserStatusService } from './user_status.service';

describe('UserStatusService', () => {
  let service: UserStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserStatusService],
    }).compile();

    service = module.get<UserStatusService>(UserStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
