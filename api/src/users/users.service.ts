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

  async findOneByState(state: string): Promise<User> {
    try {
      const user: User = await this.usersRepository.findOneOrFail({where: {state} });
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
      if (updateUserDto.pseudo)
        user.pseudo = updateUserDto.pseudo;
      if (updateUserDto.avatar_url)
        user.avatar_url = updateUserDto.avatar_url;
      if (updateUserDto.tfa_enabled)
        user.tfa_enabled = updateUserDto.tfa_enabled;
      if (updateUserDto.tfa_email)
        user.tfa_email = updateUserDto.tfa_email;
      if (updateUserDto.status_id)
        user.status_id = updateUserDto.status_id;
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
    
    const bcrypt = require('bcrypt');
    const saltRounds: number = 10;
    const hash: string = await bcrypt.hash(createUserDto.password, saltRounds);
    newuser.password = hash;
    newuser.pseudo = createUserDto.pseudo;
    
    newuser.tfa_enabled = false;
    newuser.tfa_email = createUserDto.tfa_email;
  
    newuser.status_id = 0;
    newuser.status_updated_at = new Date();
  
    newuser.creation_date = new Date();

    newuser.state = createUserDto.state;

    await this.usersRepository.save(newuser);
    return newuser;
  }

}
