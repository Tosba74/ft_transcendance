import { ConsoleLogger, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserModel } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';
import { FriendModel } from "./models/friend.model";
import { FriendTypeModel } from 'src/friend_types/models/friend_type.model';
import { FriendDto } from './dto/friend.dto';
import { arrayBuffer } from 'stream/consumers';
import { UserDto } from 'src/_shared_dto/user.dto';


@Injectable()
export class FriendsService {

  constructor(
    @InjectRepository(FriendModel) private friendsRepository: Repository<FriendModel>,
    private usersService: UsersService,
  ) { }

  findAll(): Promise<FriendModel[]> {
    return this.friendsRepository.find();
  }

  async findOneById(id: number): Promise<FriendModel> {
    try {
      const friend = await this.friendsRepository.findOneOrFail({
        where: { id: id },
        relations: {
          // first_user: true,
          // second_user: true,
          friend_type: true,
        }
      });
      return friend;
    }
    catch (error) {
      throw new NotFoundException('Friend id not found');
    }
  }


  async findFriends(id: number): Promise<UserDto[]> {
    const friends1 = await this.friendsRepository.find({
      where: {
        first_user: { id: id },
        friend_type: { id: FriendTypeModel.FRIEND_TYPE }
      },
      relations: {
        second_user: true,
      }
    });

    const friends2 = await this.friendsRepository.find({
      where: {
        second_user: { id: id },
        friend_type: { id: FriendTypeModel.FRIEND_TYPE },
      },
      relations: {
        first_user: true,
      }
    });

    // let res: UserDto[] = [];
    let res: UserDto[] = await Promise.all(friends1.map(async (value) => {
      return {
        ...value.second_user.toUserDto(),
        status: await this.usersService.getUserStatus(value.second_user.id),
      } as UserDto;
    }));

    res = res.concat(await Promise.all(friends2.map(async (value) => {
      return {
        ...value.first_user.toUserDto(),
        status: await this.usersService.getUserStatus(value.first_user.id),
      } as UserDto;
    })));

    return res;
  }


  async createFriendship(friender_id: number, newfriend_id: number): Promise<FriendModel> {

    if (friender_id == newfriend_id)
      throw new BadRequestException('Cannot self friend');


    const reverseFriend = await this.friendsRepository.findOne({
      where: {
        first_user: { id: newfriend_id },
        second_user: { id: friender_id },
      },
      relations: {
        // first_user: true,
        // second_user: true,
        friend_type: true,
      }
    });

    if (reverseFriend != null) {
      if (reverseFriend.friend_type.id == FriendTypeModel.ASKED_TYPE) {
        reverseFriend.friend_type.id = FriendTypeModel.FRIEND_TYPE;
      }

      await this.friendsRepository.save(reverseFriend).catch((err: any) => {
        throw new BadRequestException('Friend creation error');
      });

      return this.findOneById(reverseFriend.id);
    }


    const alreadyExists = await this.friendsRepository.findOne({
      where: {
        first_user: { id: friender_id },
        second_user: { id: newfriend_id },
      },
      relations: {
        // first_user: true,
        // second_user: true,
        friend_type: true,
      }
    });

    if (alreadyExists != null) {
      return alreadyExists;
    }


    const newfriend = this.friendsRepository.create({
      first_user: { id: friender_id },
      second_user: { id: newfriend_id },
      friend_type: { id: FriendTypeModel.ASKED_TYPE },
    });

    const createdfriend = await this.friendsRepository.save(newfriend).catch((err: any) => {
      throw new BadRequestException('Friend creation error');
    });

    return await this.findOneById(createdfriend.id);
  }



  async deleteFriendship(friender_id: number, newfriend_id: number): Promise<void> {

    if (friender_id == newfriend_id)
      throw new BadRequestException('Cannot self friend delete');


    const reverseFriend = await this.friendsRepository.findOne({
      where: {
        first_user: { id: newfriend_id },
        second_user: { id: friender_id },
      }
    });

    if (reverseFriend != null) {
      await this.friendsRepository.delete(reverseFriend);
    }


    const goodDirection = await this.friendsRepository.findOne({
      where: {
        first_user: { id: friender_id },
        second_user: { id: newfriend_id },
      }
    });

    if (goodDirection != null) {
      await this.friendsRepository.delete(goodDirection);
    }
  }
}
