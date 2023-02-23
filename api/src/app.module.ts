import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { UsersModule } from './users/users.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import config from "../ormconfig"

// import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forRoot(config), UsersModule, ChatModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, 
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ]
})
export class AppModule { }
