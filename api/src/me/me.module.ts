import { Module } from '@nestjs/common';

import { MeService } from './me.service';
import { MeController } from './me.controller';

import { UsersModule } from 'src/users/users.module';
import { FriendsModule } from 'src/friends/friends.module';

@Module({
  imports: [UsersModule,  FriendsModule],
  providers: [MeService],
  controllers: [MeController],
  exports: [MeService],
})
export class MeModule {}
