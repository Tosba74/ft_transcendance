import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatParticipantsService } from './chat_participants.service';
import { ChatParticipantsController } from './chat_participants.controller';
import { ChatParticipantModel } from './models/chat_participant.model';
import { ChatsModule } from 'src/chats/chats.module';

@Module({
  imports: [TypeOrmModule.forFeature([ChatParticipantModel]), forwardRef(() => ChatsModule)],
  providers: [ChatParticipantsService],
  controllers: [ChatParticipantsController],
  exports: [ChatParticipantsService],
})
export class ChatParticipantsModule {}
