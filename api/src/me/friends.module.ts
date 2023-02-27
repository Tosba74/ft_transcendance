import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MeService } from './me.service';
import { MeController } from './me.controller';

@Module({
  providers: [MeService],
  controllers: [MeController],
  exports: [MeService],
})
export class MeModule {}
