import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from "./user.entity";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User)private usersRepository: Repository<User>) { }
  
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOneById(id: number): Promise<User> {
    try {
      const user: User = await this.usersRepository.findOneOrFail({where: {id} });
      return user;
    } catch(error) {
      throw new NotFoundException();
    }
  }

  async findOneByPseudo(pseudo: string): Promise<User> {
    try {
      const user: User = await this.usersRepository.findOneOrFail({where: {pseudo} });
      return user;
    } catch(error) {
      throw new NotFoundException();
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const user: User = await this.findOneById(id);
      return await this.usersRepository.remove(user);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User>
  {
    try {
      let user: User = await this.findOneById(id);

      if (updateUserDto.password)
      {
        const bcrypt = require('bcrypt');
        const saltRounds: number = 10;
        const hash: string = await bcrypt.hash(updateUserDto.password, saltRounds);
        user.password = hash;
      }
      if (updateUserDto.login_name)
        user.login_name = updateUserDto.login_name;
      if (updateUserDto.pseudo)
        user.pseudo = updateUserDto.pseudo;
      if (updateUserDto.avatar_url)
        user.avatar_url = updateUserDto.avatar_url;
      if (updateUserDto.tfa_enabled)
        user.tfa_enabled = updateUserDto.tfa_enabled;
      if (updateUserDto.tfa_email)
        user.tfa_email = updateUserDto.tfa_email;
      if (updateUserDto.status)
        user.status = updateUserDto.status;
      if (updateUserDto.status_updated_at)
        user.status_updated_at = updateUserDto.status_updated_at;
      if (updateUserDto.token)
        user.token = updateUserDto.token;

      return await this.usersRepository.save(user);
    } catch(error) {
      throw error;
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newuser = this.usersRepository.create();
    
    newuser.login_name = createUserDto.login_name;
    newuser.pseudo = createUserDto.pseudo;
    
    newuser.tfa_enabled = false;
    newuser.status = 0;
    newuser.status_updated_at = new Date();
    newuser.created_at = new Date();

    if (createUserDto.password)
    {
      const bcrypt = require('bcrypt');
      const saltRounds: number = 10;
      const hash: string = await bcrypt.hash(createUserDto.password, saltRounds);
      newuser.password = hash;
    }
    if (createUserDto.tfa_email)
      newuser.tfa_email = createUserDto.tfa_email;
    if (createUserDto.token)
      newuser.token = createUserDto.token;

    await this.usersRepository.save(newuser);
    return newuser;
  }

}
