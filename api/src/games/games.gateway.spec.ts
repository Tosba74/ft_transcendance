import { Test, TestingModule } from '@nestjs/testing';
import { GamesGateway } from './games.gateway';
import { GamesService } from './games.service';

describe('GamesGateway', () => {
  let gateway: GamesGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GamesGateway, GamesService],
    }).compile();

    gateway = module.get<GamesGateway>(GamesGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
