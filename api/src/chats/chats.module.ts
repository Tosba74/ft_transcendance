import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { ChatModel } from './models/chat.model';
import { ChatsGateway } from './chats.gateway';
import { MeModule } from 'src/me/me.module';
import { ChatMessagesModule } from 'src/chat_messages/chat_messages.module';

@Module({
  imports: [TypeOrmModule.forFeature([ChatModel]), forwardRef(() => MeModule), ChatMessagesModule],
  providers: [ChatsService, ChatsGateway],
  controllers: [ChatsController],
  exports: [ChatsService],
})
export class ChatsModule {}
