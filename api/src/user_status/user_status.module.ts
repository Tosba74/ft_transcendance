import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserStatusService } from './user_status.service';
import { UserStatusController } from './user_status.controller';
import { UserStatusModel } from './models/user_status.model';

@Module({
  imports: [TypeOrmModule.forFeature([UserStatusModel])],
  providers: [UserStatusService],
  controllers: [UserStatusController],
  exports: [UserStatusService],
})
export class UserStatusModule {}
