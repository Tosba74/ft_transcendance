import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { FriendModel } from './models/friend.model';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([FriendModel]),  forwardRef(() => UsersModule)],
  providers: [FriendsService],
  controllers: [FriendsController],
  exports: [FriendsService],
})
export class FriendsModule {}
