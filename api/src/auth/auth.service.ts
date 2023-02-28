
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException } from '@nestjs/common';

import { LoggedUserDto } from './dto/logged_user.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async validateUser(loginname: string, password: string): Promise<LoggedUserDto | null> {

        const user = await this.usersService.findOneByLoginName(loginname);
        
        if (user && user.password && await bcrypt.compare(password, user.password)) {

            // const loggedUser = user as LoggedUserDto;

            const loggedUser: LoggedUserDto = {
                id: user.id,
                login_name: user.login_name,
                pseudo: user.pseudo,
                avatar_url: user.avatar_url,
                is_admin: user.is_admin,
            };

            return loggedUser;
        }

        return null;
    }


    async validateOrCreateUser(loginname: string): Promise<LoggedUserDto | null> {

        try {
            const user = await this.usersService.findOneByLoginName(loginname);
            
            const loggedUser: LoggedUserDto = {
                id: user.id,
                login_name: user.login_name,
                pseudo: user.pseudo,
                avatar_url: user.avatar_url,
                is_admin: user.is_admin,
            };
            
            return loggedUser;
        }
        catch ( NotFoundException ) {
            const user = await this.usersService.apiCreate(loginname);
            
            const loggedUser: LoggedUserDto = {
                id: user.id,
                login_name: user.login_name,
                pseudo: user.pseudo,
                avatar_url: user.avatar_url,
                is_admin: user.is_admin,
            };

            return loggedUser;
        }
        return null
    }

    async login(user: any) {
        const access_token = this.jwtService.sign(user);
        
        return {...user, access_token: access_token};
      }

}
