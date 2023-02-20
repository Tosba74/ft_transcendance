import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatTypesService } from './chat_types.service';
import { ChatTypesController } from './chat_types.controller';
import { ChatTypeModel } from './models/chat_type.model';

@Module({
  imports: [TypeOrmModule.forFeature([ChatTypeModel])],
  providers: [ChatTypesService],
  controllers: [ChatTypesController],
  exports: [ChatTypesService],
})
export class ChatTypesModule {}
