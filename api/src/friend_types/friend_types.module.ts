import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FriendTypesService } from './friend_types.service';
import { FriendTypesController } from './friend_types.controller';
import { FriendTypeModel } from './models/friend_type.model';

@Module({
  imports: [TypeOrmModule.forFeature([FriendTypeModel])],
  providers: [FriendTypesService],
  controllers: [FriendTypesController],
  exports: [FriendTypesService],
})
export class FriendTypesModule {}
