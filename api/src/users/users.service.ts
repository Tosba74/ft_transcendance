import { Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from "./models/user.model";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// HOW TO PREVENT SQL INJECTIONS WITH TYPEORM ?

@Injectable()
export class UsersService {

  constructor(@InjectRepository(UserModel)private usersRepository: Repository<UserModel>)
  {}
  
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
      const user: UserModel = await this.usersRepository.findOneOrFail({where: {id} });
      return user;
    } catch(error) {
      throw new NotFoundException();
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const user: UserModel = await this.findOneById(id);
      await this.usersRepository.delete(id);
    } catch(error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserModel>
  {
    try {
      let user: UserModel = await this.findOneById(id);

      if (updateUserDto.login_name)
        user.login_name = updateUserDto.login_name;
      if (updateUserDto.password)
      {
        const bcrypt = require('bcrypt');
        const saltRounds: number = 10;
        const hash: string = await bcrypt.hash(updateUserDto.password, saltRounds);
        user.password = hash;
      }
      if (updateUserDto.pseudo)
        user.pseudo = updateUserDto.pseudo;

      this.usersRepository.save(user);
      return user;
    } catch(error) {
      throw new NotFoundException();
    }
  }

  async create(createUserDto: CreateUserDto): Promise<UserModel> {
    const newuser = new UserModel();
  
    // id = db autoincrement
  
    newuser.login_name = createUserDto.login_name;
    const bcrypt = require('bcrypt');
    const saltRounds: number = 10;
    const hash: string = await bcrypt.hash(createUserDto.password, saltRounds);
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

}
