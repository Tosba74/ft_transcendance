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

import { ChatTypesModule } from './chat_types/chat_types.module';
import { ChatRolesModule } from './chat_roles/chat_roles.module';
import { ChatsModule } from './chats/chats.module';
import { ChatMessagesModule } from './chat_messages/chat_messages.module';
import { ChatParticipantsModule } from './chat_participants/chat_participants.module';

import { AuthModule } from './auth/auth.module';

import { APP_GUARD } from '@nestjs/core';
import { AppGuard } from './auth/app.guard';


@Module({
  imports: [TypeOrmModule.forRoot(config),
    UsersModule, UserStatusModule, FriendTypesModule, FriendsModule, FriendTypesModule,
    ChatTypesModule, ChatRolesModule, ChatsModule, ChatMessagesModule, ChatParticipantsModule,
    AuthModule,
    ChatModule,
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
