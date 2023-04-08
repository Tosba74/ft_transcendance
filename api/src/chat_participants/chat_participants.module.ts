import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatParticipantsService } from './chat_participants.service';
import { ChatParticipantsController } from './chat_participants.controller';
import { ChatParticipantModel } from './models/chat_participant.model';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([ChatParticipantModel]), UsersModule],
  providers: [ChatParticipantsService],
  controllers: [ChatParticipantsController],
  exports: [ChatParticipantsService],
})
export class ChatParticipantsModule {}
