import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';

import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModel } from './users/models/user.model';


@Module({
  imports: [
    UsersModule,

    TypeOrmModule.forRoot({
      type: "postgres",
      host: "postgres",
      port: 5432,
      username: "user",
      password: "password",
      database: "test_db",
      synchronize: true,
      logging: false,
      entities: [UserModel],
      migrations: [],
      subscribers: [],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
