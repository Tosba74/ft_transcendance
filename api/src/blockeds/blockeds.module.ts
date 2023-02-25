import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BlockedsService } from './blockeds.service';
import { BlockedsController } from './blockeds.controller';
import { BlockedModel } from './models/blocked.model';

@Module({
  imports: [TypeOrmModule.forFeature([BlockedModel])],
  providers: [BlockedsService],
  controllers: [BlockedsController],
  exports: [BlockedsService],
})
export class BlockedsModule {}
