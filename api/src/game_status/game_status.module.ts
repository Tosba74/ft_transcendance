import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GameStatusService } from './game_status.service';
import { GameStatusController } from './game_status.controller';
import { GameStatusModel } from './models/game_status.model';

@Module({
  imports: [TypeOrmModule.forFeature([GameStatusModel])],
  providers: [GameStatusService],
  controllers: [GameStatusController],
  exports: [GameStatusService],
})
export class GameStatusModule {}
