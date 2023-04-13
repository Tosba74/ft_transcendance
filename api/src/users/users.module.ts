import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserModel } from './models/user.model';
import { GamesModule } from 'src/games/games.module';
import { FriendsModule } from 'src/friends/friends.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel]), forwardRef(() => GamesModule), forwardRef(() => FriendsModule)],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
