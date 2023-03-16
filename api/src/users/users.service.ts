import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserModel } from "./models/user.model";
import { UserStatusModel } from 'src/user_status/models/user_status.model';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePseudoDto } from './dto/update-pseudo.dto';
import { LoggedUserDto } from 'src/auth/dto/logged_user.dto';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(UserModel) private usersRepository: Repository<UserModel>) { }

  findAll(): Promise<UserModel[]> {
    return this.usersRepository.find();
  }

  async findOneById(id: number): Promise<UserModel> {
    try {
      const user = await this.usersRepository.findOneOrFail({
        where: { id: id }
      });
      return user;
    }
    catch (error) {
      throw new NotFoundException('User id not found');
    }
  }

  async findOneByLoginName(login: string): Promise<UserModel> {
    try {
      const user = await this.usersRepository.findOneOrFail({
        select: ['id', 'login_name', 'pseudo', 'color', 'avatar_url', 'tfa_enabled', 'is_admin', 'password'],
        where: { login_name: login }
      });
      return user;
    }
    catch (error) {
      throw new NotFoundException('User login not found');
    }
  }

  async create(createUserDto: CreateUserDto): Promise<UserModel> {
    const newuser = new UserModel();

    newuser.pseudo = createUserDto.pseudo;
    newuser.login_name = createUserDto.login_name;

    const bcrypt = require('bcrypt');
    const saltRounds: number = 10;
    const hash: string = await bcrypt.hash(createUserDto.password, saltRounds);
    newuser.password = hash;
    
    newuser.avatar_url = '';

    newuser.tfa_enabled = false;
    newuser.tfa_secret = '';

    newuser.status = new UserStatusModel(UserStatusModel.OFFLINE_STATUS);
    newuser.status_updated_at = new Date();

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
    newuser.tfa_secret = '';

    newuser.status = new UserStatusModel(UserStatusModel.OFFLINE_STATUS);
    newuser.status_updated_at = new Date();

    await this.usersRepository.save(newuser);
    return newuser;
  }


  // async update(id: number, updateUserDto: UpdateUserDto): Promise<UserModel> {
  //   try {
  //     let user: UserModel = await this.findOneById(id);

  //     if (updateUserDto.login_name)
  //       user.login_name = updateUserDto.login_name;

  //     if (updateUserDto.password) {
  //       const saltRounds: number = 10;
  //       const hash: string = await bcrypt.hash(updateUserDto.password, saltRounds);
  //       user.password = hash;
  //     }

  //     if (updateUserDto.pseudo)
  //       user.pseudo = updateUserDto.pseudo;


  //     await this.usersRepository.save(user).catch((err: any) => {
  //       throw new BadRequestException('User update error');
  //     });

  //     return user;
  //   }
  //   catch (error) {
  //     throw new NotFoundException('User id not found');
  //   }
  // }

  async updatePseudo(id: number, updatePseudo: UpdatePseudoDto): Promise<UserModel> {
    try {
      let user: UserModel = await this.findOneById(id);

      if (updatePseudo.pseudo)
        user.pseudo = updatePseudo.pseudo;

      await this.usersRepository.save(user).catch((err: any) => {
        throw new BadRequestException('User pseudo update error');
      });
      return user;
    }
    catch (error) {
      throw new NotFoundException('User id not found');
    }
  }

  // EXCEPTION MARCHE PAS ???
  async delete(id: number): Promise<void> {
    try {
      const user: UserModel = await this.findOneById(id);
      this.usersRepository.delete(id);
    }
    catch (error) {
      throw new NotFoundException('User id not found');
    }
  }

  // -------------------- TFA --------------------

  async enableTfa(id: number) {
    try {
      let user: UserModel = await this.findOneById(id);
      user.tfa_enabled = true;
      await this.usersRepository.save(user);
    }
    catch (error) {
      throw new NotFoundException('User id not found');
    }
  }

  async disableTfa(id: number) {
    try {
      let user: UserModel = await this.findOneById(id);
      user.tfa_enabled = false;
      await this.usersRepository.save(user);
    }
    catch (error) {
      throw new NotFoundException('User id not found');
    }
  }

  async isTfaEnabled(id: number): Promise<boolean> {
    try {
      let user: UserModel = await this.findOneById(id);
      return user.tfa_enabled;
    }
    catch (error) {
      throw new NotFoundException('User id not found');
    }
  }

  async setTfaSecret(secret: string, id: number): Promise<UserModel> {
    try {
      let user: UserModel = await this.findOneById(id);
      user.tfa_secret = secret;
      await this.usersRepository.save(user);
      return user;
    }
    catch (error) {
      throw new NotFoundException('User id not found');
    }
  }

  async unsetTfaSecret(id: number): Promise<UserModel> {
    try {
      let user: UserModel = await this.findOneById(id);
      user.tfa_secret = '';
      await this.usersRepository.save(user);
      return user;
    }
    catch (error) {
      throw new NotFoundException('User id not found');
    }
  }

  async getTfaSecret(id: number): Promise<string | undefined> {
    try {
      const user = await this.usersRepository.findOneOrFail({
        select: ['tfa_secret'],
        where: { id: id }
      });
      return user.tfa_secret;
    }
    catch (error) {
      throw new NotFoundException('User id not found');
    }
  }

}
