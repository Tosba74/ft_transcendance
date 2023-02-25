import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatRolesService } from './chat_roles.service';
import { ChatRolesController } from './chat_roles.controller';
import { ChatRoleModel } from './models/chat_role.model';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoleModel])],
  providers: [ChatRolesService],
  controllers: [ChatRolesController],
  exports: [ChatRolesService],
})
export class ChatRolesModule {}
