import { Module } from '@nestjs/common';

import { MeService } from './me.service';
import { MeController } from './me.controller';

import { UsersModule } from 'src/users/users.module';
import { FriendsModule } from 'src/friends/friends.module';
import { BlockedsModule } from 'src/blockeds/blockeds.module';

@Module({
  imports: [UsersModule,  FriendsModule, BlockedsModule],
  providers: [MeService],
  controllers: [MeController],
  exports: [MeService],
})
export class MeModule {}
