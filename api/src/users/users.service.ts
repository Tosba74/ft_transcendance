import { Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserModel } from "./models/user.model";
import { UserStatusModel } from 'src/user_status/models/user_status.model';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePseudoDto } from './dto/update-pseudo.dto';
// HOW TO PREVENT SQL INJECTIONS WITH TYPEORM ?

import { Logger } from '@nestjs/common';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(UserModel) private usersRepository: Repository<UserModel>) { }

  private readonly logger = new Logger(UsersService.name);

  findAll(): Promise<UserModel[]> {
    return this.usersRepository.find();
  }

  // async findOneByName(login_name: string): Promise<UserModel | null> {
  //   return await this.usersRepository.findOne({
  //     where: {
  //       login_name,
  //     },
  //   });
  // }

  // async findOneByName(login_name: string): Promise<boolean> {
  // 	const user: UserModel | null = await this.usersRepository.findOne({
  // 		where: {
  // 			login_name,
  // 		},
  // 	});	
  // 	return !user;
  // }

  async findOneById(id: number): Promise<UserModel> {
    try {
      const user = await this.usersRepository.findOneOrFail({ 
        where: { id: id } 
      });
      return user;
    }
    catch (error) {
      throw new NotFoundException();
    }
  }

  async findOneByLoginName(login: string): Promise<UserModel> {
    try {
      const user = await this.usersRepository.findOneOrFail({ 
        select: [ 'id', 'login_name', 'pseudo', 'avatar_url', 'is_admin', 'password' ],
        where: { login_name: login } 
      });
      return user;
    }
    catch (error) {
      throw new NotFoundException();
    }
  }

  async create(createUserDto: CreateUserDto): Promise<UserModel> {
    const newuser = new UserModel();

    // id = db autoincrement

    newuser.pseudo = createUserDto.pseudo;
    newuser.login_name = createUserDto.login_name;

    const bcrypt = require('bcrypt');
    const saltRounds: number = 10;
    const hash: string = await bcrypt.hash(createUserDto.password, saltRounds);
    newuser.password = hash;
    

    // avatar = null at creation

    newuser.tfa_enabled = false;
    // newuser.tfa_email = createUserDto.tfa_email;
    // newuser.tfa_code = createUserDto.tfa_code;
    newuser.tfa_email = '';
    newuser.tfa_code = '';

    newuser.status = new UserStatusModel(UserStatusModel.OFFLINE_STATUS);
    newuser.status_updated_at = new Date();

    // validate_date = null at creation

    await this.usersRepository.save(newuser);
    return newuser;
  }


  async apiCreate(loginName: string, displayName: string, color: number, avatar?: string): Promise<UserModel> {
    const newuser = new UserModel();

    newuser.pseudo = displayName;
    newuser.login_name = loginName;

    newuser.password = undefined;

    newuser.avatar_url = avatar;
    newuser.color = color;
    
    newuser.tfa_enabled = false;
    newuser.tfa_email = '';
    newuser.tfa_code = '';

    newuser.status = new UserStatusModel(UserStatusModel.OFFLINE_STATUS);
    newuser.status_updated_at = new Date();

    await this.usersRepository.save(newuser);
    return newuser;
  }

  // EXCEPTION MARCHE PAS ???
  async delete(id: number): Promise<void> {
    try {
      const user: UserModel = await this.findOneById(id);
      this.usersRepository.delete(id);
    }
    catch (error) {
      throw new NotFoundException();
    } 
  }


  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserModel> {
    try {
      let user: UserModel = await this.findOneById(id);

      if (updateUserDto.login_name)
        user.login_name = updateUserDto.login_name;

      if (updateUserDto.password) {
        const saltRounds: number = 10;
        const hash: string = await bcrypt.hash(updateUserDto.password, saltRounds);
        user.password = hash;
      }

      if (updateUserDto.pseudo)
        user.pseudo = updateUserDto.pseudo;

      await this.usersRepository.save(user);

      return user;
    }
    catch (error) {
      throw new NotFoundException();
    }
  }



  async updatePseudo(id: number, updatePseudo: UpdatePseudoDto): Promise<UserModel> {
    try {
      let user: UserModel = await this.findOneById(id);

      if (updatePseudo.pseudo)
        user.pseudo = updatePseudo.pseudo;

      await this.usersRepository.save(user);
      return user;
    }
    catch (error) {
      throw new NotFoundException();
    }
  }
}
