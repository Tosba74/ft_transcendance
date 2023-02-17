import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ChatModule } from './chat/chat.module';
import { UsersModule } from './users/users.module';
import { UserStatusModule } from './user_status/user_status.module';
import { FriendTypesModule } from './friend_types/friend_types.module';
import { FriendsModule } from './friends/friends.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import config from './_typeorm/ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(config), 
    UsersModule, UserStatusModule, FriendTypesModule, FriendsModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
