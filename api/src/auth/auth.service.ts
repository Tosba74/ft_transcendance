import { Injectable, Inject } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';

@Injectable()
export class AuthService {
	@Inject(UsersService)
	private readonly usersService: UsersService;

	async createUser(createUserDto: CreateUserDto): Promise<User> {
		return this.usersService.create(createUserDto);
	}

	async updateUser(id:number, updateUserDto: UpdateUserDto): Promise<User> {
		return this.usersService.update(id, updateUserDto);
	}

	// async validateUser(pseudo: string, password: string): Promise<any> {
	// 	try {
	// 		const user: User = await this.usersService.findOneByPseudo(pseudo);
	// 		// ... check password
	// 	} catch (error) {
	// 		throw error;
	// 	}
	// }
}
