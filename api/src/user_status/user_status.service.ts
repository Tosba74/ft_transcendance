import { Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserStatusModel } from "./models/user_status.model";


@Injectable()
export class UserStatusService {

  constructor(@InjectRepository(UserStatusModel)private userStatusRepository: Repository<UserStatusModel>)
  {}
  
  findAll(): Promise<UserStatusModel[]> {
    return this.userStatusRepository.find();
  }

  async findOneById(id: number): Promise<UserStatusModel> {
    try {
      const user: UserStatusModel = await this.userStatusRepository.findOneOrFail({where: {id} });
      return user;
    } catch(error) {
      throw new NotFoundException();
    }
  }
}
