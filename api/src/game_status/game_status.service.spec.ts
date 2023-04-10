import { Test, TestingModule } from '@nestjs/testing';
import { GameStatusService } from './game_status.service';

describe('GameStatusService', () => {
  let service: GameStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameStatusService],
    }).compile();

    service = module.get<GameStatusService>(GameStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
