import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { GameModel } from './models/game.model';
import { GamesGateway } from './games.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([GameModel])],
  providers: [GamesService, GamesGateway],
  controllers: [GamesController],
  exports: [GamesService],
})
export class GamesModule {}
