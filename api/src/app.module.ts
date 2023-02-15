import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ChatModule } from './chat/chat.module';
import { UsersModule } from './users/users.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import config from './typeorm/ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(config), UsersModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
