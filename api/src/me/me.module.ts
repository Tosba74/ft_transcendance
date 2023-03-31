import { forwardRef, Module } from '@nestjs/common';

import { MeService } from './me.service';
import { MeController } from './me.controller';

import { UsersModule } from 'src/users/users.module';
import { FriendsModule } from 'src/friends/friends.module';
import { BlockedsModule } from 'src/blockeds/blockeds.module';
import { ChatsModule } from 'src/chats/chats.module';
import { ChatParticipantsModule } from 'src/chat_participants/chat_participants.module';

@Module({
  imports: [UsersModule, FriendsModule, BlockedsModule, forwardRef(() => ChatsModule), forwardRef(() => ChatParticipantsModule)],
  providers: [MeService],
  controllers: [MeController],
  exports: [MeService],
})
export class MeModule {}
