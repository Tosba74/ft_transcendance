import { Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FriendTypeModel } from "./models/friend_type.model";


@Injectable()
export class FriendTypesService {

  constructor(@InjectRepository(FriendTypeModel) private friendTypesRepository: Repository<FriendTypeModel>) { }

  findAll(): Promise<FriendTypeModel[]> {
    return this.friendTypesRepository.find();
  }

  async findOneById(id: number): Promise<FriendTypeModel> {
    try {
      const friendType = await this.friendTypesRepository.findOneOrFail({ 
        where: { id } 
      });
      return friendType;
    } 
    catch (error) {
      throw new NotFoundException();
    }
  }
}
