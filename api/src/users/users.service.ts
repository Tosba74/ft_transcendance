import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserModel } from "./models/user.model";

import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePseudoDto } from '../me/dto/update-pseudo.dto';
import * as fs from 'fs';
import { extname } from 'path';
import { GamesService } from 'src/games/games.service';
import { UserDto } from 'src/_shared_dto/user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserModel) private usersRepository: Repository<UserModel>,
    private gamesService: GamesService
  ) { }


  /* 
      --------- CRUD usual methods ---------
  */


  async findAll(admin_view: boolean = false): Promise<UserModel[] | UserDto[]> {
    if (admin_view) {
      return this.usersRepository.find();
    }
    else {
      const users = await this.usersRepository.find();

      const usersDto: UserDto[] = await Promise.all(users.map(async (value) => {
        return {
          ...value.toUserDto(),
          status: await this.getUserStatus(value.id),
        }
      }));

      return usersDto;
    }
  }



  async findOneById(id: number, admin_view: boolean = false): Promise<UserModel | UserDto> {
    try {
      if (admin_view) {
        const user = await this.usersRepository.findOneOrFail({
          where: { id: id }
        });
        return user;
      }
      else {
        const user = await this.usersRepository.findOneOrFail({
          where: { id: id }
        });
        return {
          ...user.toUserDto(),
          status: await this.getUserStatus(user.id),
        };
      }
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

  async getUserStatus(id: number): Promise<string> {

    return this.gamesService.getUserStatus(id);
  }

  async findOneByPseudo(pseudo: string): Promise<UserModel> {
    try {
      const user = await this.usersRepository.findOneOrFail({
        where: { pseudo: pseudo }
      });
      return user;
    }
    catch (error) {
      throw new NotFoundException('User pseudo not found');
    }
  }



  async create(pseudo: string, login_name: string, password: string): Promise<UserModel> {
    const newuser = new UserModel();

    newuser.pseudo = pseudo;
    newuser.login_name = login_name;

    const saltRounds: number = 10;
    const hash: string = await bcrypt.hash(password, saltRounds);
    newuser.password = hash;

    newuser.avatar_url = '/avatars/default-avatar.jpg';

    newuser.tfa_enabled = false;
    newuser.tfa_secret = '';

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
      newuser.avatar_url = '/avatars/default-avatar.jpg';
    newuser.color = color;

    newuser.tfa_enabled = false;
    newuser.tfa_secret = '';

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
      const user: UserModel = await this.findOneById(id) as UserModel;
      // await this.usersRepository.delete(user);
      await this.usersRepository.delete(id).catch(() => {
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

  async updatePseudo(id: number, pseudo: string): Promise<boolean> {
    var user: UserModel = await this.findOneById(id) as UserModel;

    const pseudo_exist = await this.usersRepository.findOne({
      where: { pseudo: pseudo }
    })
    if (pseudo_exist)
      throw new UnauthorizedException('Pseudo already used')

    user.pseudo = pseudo;
    await this.usersRepository.save(user).catch(() => {
      throw new BadRequestException('User pseudo update error');
    });
    return true;
  }


  async updateAvatar(id: number, filename: string): Promise<string> {
    var user: UserModel = await this.findOneById(id) as UserModel;

    // remove l'ancienne image de la memoire du volume
    const prevAvatarUrl: string = user.avatar_url;
    if (prevAvatarUrl.indexOf('https://cdn.intra.42.fr') === -1 &&
      prevAvatarUrl.indexOf('default-avatar') === -1) {
      const i: number = prevAvatarUrl.lastIndexOf('/');
      const prevFilename: string = prevAvatarUrl.substring(i + 1);
      const prevFile: string = `../app-datas/avatars/${prevFilename}`;
      fs.unlink(prevFile, (err) => {
        if (err)
          console.log(`Could not remove the old file ${prevFile} from user ${user.id}`);
        // file removed!
      })
    }

    user.avatar_url = `/avatars/${filename}`;
    await this.usersRepository.save(user).catch((err: any) => {
      throw new BadRequestException('User avatar update error');
    });
    return user.avatar_url;
  }


  /* 
      --------- TFA methods ---------
  */

  async setTfaEnabled(id: number, state: boolean): Promise<boolean> {
    try {
      let user: UserModel = await this.findOneById(id) as UserModel;
      user.tfa_enabled = state;
      await this.usersRepository.save(user);
      return user.tfa_enabled;
    }
    catch (error) {
      throw new NotFoundException('User id not found');
    }
  }

  async isTfaEnabled(id: number): Promise<boolean> {
    try {
      let user: UserModel = await this.findOneById(id) as UserModel;
      return user.tfa_enabled;
    }
    catch (error) {
      throw new NotFoundException('User id not found');
    }
  }

  async setTfaSecret(secret: string, id: number): Promise<UserModel> {
    try {
      let user: UserModel = await this.findOneById(id) as UserModel;
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
