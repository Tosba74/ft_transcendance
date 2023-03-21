import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserModel } from "./models/user.model";
import { UserStatusModel } from 'src/user_status/models/user_status.model';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePseudoDto } from './dto/update-pseudo.dto';
import * as fs from 'fs';
import { extname } from 'path';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(UserModel) private usersRepository: Repository<UserModel>) { }


  /* 
      --------- CRUD usual methods ---------
  */

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

    const saltRounds: number = 10;
    const hash: string = await bcrypt.hash(createUserDto.password, saltRounds);
    newuser.password = hash;
    
    newuser.avatar_url = 'https://localhost:8443/avatars/default-avatar.jpg';

    newuser.tfa_enabled = false;
    newuser.tfa_secret = '';

    newuser.status = new UserStatusModel(UserStatusModel.OFFLINE_STATUS);
    newuser.status_updated_at = new Date();

    await this.usersRepository.save(newuser).catch((err: any) => {
      throw new BadRequestException('User creation error');
    });
    return newuser;
  }


  async apiCreate(loginName: string, displayName: string, color: number, avatar?: string): Promise<UserModel> {
    const newuser = new UserModel();

    newuser.pseudo = displayName;
    newuser.login_name = loginName;

    newuser.password = undefined;

    if (avatar)
      newuser.avatar_url = avatar;
    else
      newuser.avatar_url = 'https://localhost:8443/avatars/default-avatar.jpg';
    newuser.color = color;

    newuser.tfa_enabled = false;
    newuser.tfa_secret = '';

    newuser.status = new UserStatusModel(UserStatusModel.OFFLINE_STATUS);
    newuser.status_updated_at = new Date();

    await this.usersRepository.save(newuser).catch((err: any) => {
      throw new BadRequestException('User creation error');
    });
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

  async delete(id: number): Promise<void> {
    try {
      const user: UserModel = await this.findOneById(id);
      // await this.usersRepository.delete(user);
      await this.usersRepository.delete(id).catch((err: any) => {
        throw new BadRequestException('Delete user error');
      });
    }
    catch (error) {
      throw new NotFoundException('User id not found');
    }
  }



  /* 
      --------- OUR APP additional methods ---------
  */

  // async getProfile(id: number): Promise<UserModel> {
  //   return this.findOneById(id);
  // }

  // async getPublicProfile(id: number) {
    
  // }

  // async getPrivateProfile(id: number) {

  // }

  async updatePseudo(id: number, updatePseudo: UpdatePseudoDto): Promise<boolean> {
    try {
      let user: UserModel = await this.findOneById(id);

      if (updatePseudo.pseudo)
        user.pseudo = updatePseudo.pseudo;

      await this.usersRepository.save(user).catch((err: any) => {
        throw new BadRequestException('User pseudo update error');
      });
      return true;
    }
    catch (error) {
      throw new NotFoundException('User id not found');
    }
  }

  async updateAvatar(id: number, filename: string): Promise<string> {
    try {
      let user: UserModel = await this.findOneById(id);
  
      // remove l'ancienne image de la memoire du volume
      const prevAvatarUrl: string = user.avatar_url;
      if (prevAvatarUrl.indexOf('https://cdn.intra.42.fr') === -1 &&
        prevAvatarUrl.indexOf('default-avatar') === -1)
      {
        const i: number = prevAvatarUrl.lastIndexOf('/');
        const prevFilename: string = prevAvatarUrl.substring(i+1);
        const prevFile: string = `../app-datas/avatars/${prevFilename}`;
        fs.unlink(prevFile, (err) => {
          if (err)
            console.log(`Could not remove the old file ${prevFile} from user ${user.id}`);
          // file removed!
        })
      }
      
      user.avatar_url = `https://localhost:8443/avatars/${filename}`;
      await this.usersRepository.save(user).catch((err: any) => {
        throw new BadRequestException('User avatar update error');
      });
      return user.avatar_url;
    }
    catch (error) {
      throw new NotFoundException('User id not found');
    }
  }



  /* 
      --------- TFA methods ---------
  */
    
  async setTfaEnabled(id: number) {
    try {
      let user: UserModel = await this.findOneById(id);
      user.tfa_enabled = !user.tfa_enabled;
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
