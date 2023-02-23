import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatMessagesService } from './chat_messages.service';
import { ChatMessagesController } from './chat_messages.controller';
import { ChatMessageModel } from './models/chat_message.model';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessageModel])],
  providers: [ChatMessagesService],
  controllers: [ChatMessagesController],
  exports: [ChatMessagesService],
})
export class ChatMessagesModule {}
