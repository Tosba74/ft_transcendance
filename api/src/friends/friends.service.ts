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
      throw new NotFoundException();
    }
  }


  async createFriendship(friender_id: number, newfriend_id: number): Promise<FriendModel> {

    if (friender_id == newfriend_id)
      throw new BadRequestException();


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

      await this.friendsRepository.save(reverseFriend);

      return this.findOneById(reverseFriend.id);
    }


    const alreadyExists = await this.friendsRepository.findOne({
      where: {
        first_user: { id: friender_id },
        second_user: { id: newfriend_id},
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

    try {
      const createdfriend = await this.friendsRepository.save(newfriend);
      return await this.findOneById(createdfriend.id);

    }
    catch (error) {
      throw new BadRequestException();
    }
  }



  async deleteFriendship(friender_id: number, newfriend_id: number): Promise<void> {

    if (friender_id == newfriend_id)
      throw new BadRequestException();


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
