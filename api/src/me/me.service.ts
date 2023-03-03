import { ConsoleLogger, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserModel } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';
import { FriendsService } from 'src/friends/friends.service';

import { LoggedUserDto } from 'src/auth/dto/logged_user.dto';
import { FriendModel } from 'src/friends/models/friend.model';


@Injectable()
export class MeService {
  constructor(
    private usersService: UsersService,
    private friendsService: FriendsService,
  ) { }

  async listFriends(user: LoggedUserDto): Promise<UserModel[]> {

    return this.friendsService.findFriends(user.id);
  }

  async addFriend(user: LoggedUserDto, friend_id: number): Promise<FriendModel> {

    return this.friendsService.createFriendship(user.id, friend_id);
  }

  async removeFriend(user: LoggedUserDto, friend_id: number): Promise<void> {

    return this.friendsService.deleteFriendship(user.id, friend_id);
  }
}