import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserModel } from "./models/user.model";
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserModel)
    private usersRepository: Repository<UserModel>,
  ) { }

  findAll(): Promise<UserModel[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<UserModel | null> {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  create(createUserDto: CreateUserDto): Promise<UserModel | null> {
    const newuser = new UserModel();
    newuser.display_name = createUserDto.display_name;
    newuser.login_name = createUserDto.login_name;

    return this.usersRepository.save(newuser);
  }


  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

}
