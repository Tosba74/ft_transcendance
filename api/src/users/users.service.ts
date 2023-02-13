import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserModel } from "./models/user.model";
import { CreateUserDto } from './dto/create-user.dto';

// HOW TO PREVENT SQL INJECTIONS WITH TYPEORM ?

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

  // findByLoginName(login_name: string): Promise<UserModel | null> {
  //   return this.usersRepository.findOne({
  //     where: {
  //       login_name,
  //     },
  //   });
  // }

  create(createUserDto: CreateUserDto): Promise<UserModel | null> {
    const newuser = new UserModel();

    // id = db autoincrement

    newuser.login_name = createUserDto.login_name;
    const bcrypt = require('bcrypt');
    const saltRounds: number = 10;
    const hash: string = bcrypt.hashSync(createUserDto.password, saltRounds);     // ESSAYER D'ECRIRE EN ASYNC
    newuser.password = hash;
    newuser.pseudo = createUserDto.pseudo;

    // avatar = null at creation
    
    newuser.tfa_enabled = false;
    newuser.tfa_email = createUserDto.tfa_email;
    newuser.tfa_code = createUserDto.tfa_code;
    
    newuser.status_id = 0;
    newuser.status_updated_at = new Date();
    
    newuser.creation_date = new Date();
    // validate_date = null at creation
    
    return this.usersRepository.save(newuser);
  }


  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

}
