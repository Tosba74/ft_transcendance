import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService) { }

	async validateUser(pseudo: string, password: string): Promise<any> {
		try {
			const user: User = await this.usersService.findOneByPseudo(pseudo);
			// ... check password
		} catch (error) {
			throw error;
		}
	}
}
