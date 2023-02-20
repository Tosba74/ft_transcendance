import { ConsoleLogger, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserModel } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';
import { FriendModel } from "./models/friend.model";
import { FriendTypeModel } from 'src/friend_types/models/friend_type.model';
import { FriendDto } from './dto/friend.dto';


@Injectable()
export class FriendsService {

  constructor(@InjectRepository(FriendModel) private friendsRepository: Repository<FriendModel>) { }

  findAll(): Promise<FriendModel[]> {
    return this.friendsRepository.find();
  }

  async findOneById(id: number): Promise<FriendModel> {
    try {
      const friends: FriendModel = await this.friendsRepository.findOneOrFail({
        where: { id },
        relations: {
          // first_user: true,
          // second_user: true,
          friend_type: true,
        }
      });
      return friends;
    }
    catch (error) {
      throw new NotFoundException();
    }
  }


  async create(id: number, friendDto: FriendDto): Promise<FriendModel> {

    if (id == friendDto.friend_id)
      throw new BadRequestException();


    const reverseFriend = await this.friendsRepository.findOne({
      where: {
        first_user: { id: friendDto.friend_id },
        second_user: { id: id },
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

      await this.friendsRepository.save(reverseFriend);

      return this.findOneById(reverseFriend.id);
    }


    const alreadyExists = await this.friendsRepository.findOne({
      where: {
        first_user: { id: id },
        second_user: { id: friendDto.friend_id },
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
      first_user: { id: id },
      second_user: { id: friendDto.friend_id },
      friend_type: { id: FriendTypeModel.ASKED_TYPE },
    });

    try {
      const createdfriend = await this.friendsRepository.save(newfriend);
      return await this.findOneById(createdfriend.id);

    }
    catch (error) {
      throw new BadRequestException();
    }
  }


  async delete(id: number, friendDto: FriendDto): Promise<void> {

    if (id == friendDto.friend_id)
      throw new BadRequestException();


    const reverseFriend = await this.friendsRepository.findOne({
      where: {
        first_user: { id: friendDto.friend_id },
        second_user: { id: id },
      }
    });

    if (reverseFriend != null) {
      await this.friendsRepository.delete(reverseFriend);
    }


    const goodDirection = await this.friendsRepository.findOne({
      where: {
        first_user: { id: id },
        second_user: { id: friendDto.friend_id },
      }
    });

    if (goodDirection != null) {
      await this.friendsRepository.delete(goodDirection);
    }
  }
}
