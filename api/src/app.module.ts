import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import config from './_typeorm/ormconfig';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ChatModule } from './chat/chat.module';
import { UsersModule } from './users/users.module';
import { UserStatusModule } from './user_status/user_status.module';
import { FriendTypesModule } from './friend_types/friend_types.module';
import { FriendsModule } from './friends/friends.module';
import { BlockedsModule } from './blockeds/blockeds.module';

import { ChatTypesModule } from './chat_types/chat_types.module';
import { ChatRolesModule } from './chat_roles/chat_roles.module';
import { ChatsModule } from './chats/chats.module';
import { ChatMessagesModule } from './chat_messages/chat_messages.module';
import { ChatParticipantsModule } from './chat_participants/chat_participants.module';

import { AuthModule } from './auth/auth.module';
import { TfaModule } from './tfa/tfa.module';

import { APP_GUARD } from '@nestjs/core';
import { AppGuard } from './auth/app.guard';
import { MeModule } from './me/me.module';
import { GamesModule } from './games/games.module';

import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UsersModule, UserStatusModule, FriendTypesModule, FriendsModule, FriendTypesModule, BlockedsModule,
    ChatTypesModule, ChatRolesModule, ChatsModule, ChatMessagesModule, ChatParticipantsModule,
    GamesModule, ChatModule,
    AuthModule, TfaModule, MeModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService,
     {
       provide: APP_GUARD,
       useClass: AppGuard
     }
  ],
})
export class AppModule { }
