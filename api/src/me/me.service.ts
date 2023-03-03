import { ConsoleLogger, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserModel } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';
import { FriendsService } from 'src/friends/friends.service';

import { LoggedUserDto } from 'src/auth/dto/logged_user.dto';
import { FriendModel } from 'src/friends/models/friend.model';
import { BlockedModel } from 'src/blockeds/models/blocked.model';
import { BlockedsService } from 'src/blockeds/blockeds.service';


@Injectable()
export class MeService {
  constructor(
    private usersService: UsersService,
    private friendsService: FriendsService,
    private blockedsService: BlockedsService,
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



  async listBlockedBy(user: LoggedUserDto): Promise<BlockedModel[]> {

    return this.blockedsService.blockedBy(user.id);
  }

  async listBlockeds(user: LoggedUserDto): Promise<BlockedModel[]> {

    return this.blockedsService.blockedUsers(user.id);
  }

  async addBlocked(user: LoggedUserDto, blocked_id: number): Promise<BlockedModel> {

    return this.blockedsService.blockUser(user.id, blocked_id);
  }

  async removeBlocked(user: LoggedUserDto, blocked_id: number): Promise<void> {

    return this.blockedsService.unblockUser(user.id, blocked_id);
  }
}