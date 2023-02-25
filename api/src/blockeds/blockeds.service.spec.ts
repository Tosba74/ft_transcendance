import { Test, TestingModule } from '@nestjs/testing';
import { BlockedsService } from './blockeds.service';

describe('BlockedsService', () => {
  let service: BlockedsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlockedsService],
    }).compile();

    service = module.get<BlockedsService>(BlockedsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
