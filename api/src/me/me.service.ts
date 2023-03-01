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

  async addFriend(user: LoggedUserDto, friend_id: number): Promise<FriendModel> {

    // const user = await this.usersService.findOneByLoginName(loginname);

    // if (user && user.password && await bcrypt.compare(password, user.password)) {

    //   // const loggedUser = user as LoggedUserDto;

    //   const loggedUser: LoggedUserDto = {
    //     id: user.id,
    //     login_name: user.login_name,
    //     pseudo: user.pseudo,
    //     avatar_url: user.avatar_url,
    //     is_admin: user.is_admin,
    //   };

    //   return loggedUser;
    // }

    // return null;

    return new FriendModel();
  }
}