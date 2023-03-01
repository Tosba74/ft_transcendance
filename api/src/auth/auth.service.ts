
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException } from '@nestjs/common';
import axios from 'axios';

import { LoggedUserDto } from './dto/logged_user.dto';
import { title } from 'process';

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
                color: user.color,
                avatar_url: user.avatar_url,
                is_admin: user.is_admin,
            };

            return loggedUser;
        }

        return null;
    }


    async validateOrCreateUser(loginname: string, infos: any = {}): Promise<LoggedUserDto | null> {

        try {
            const user = await this.usersService.findOneByLoginName(loginname);

            const loggedUser: LoggedUserDto = {
                id: user.id,
                login_name: user.login_name,
                pseudo: user.pseudo,
                color: user.color,
                avatar_url: user.avatar_url,
                is_admin: user.is_admin,
            };

            return loggedUser;
        }
        catch (NotFoundException) {

            let displayName = loginname;
            let color = -1;
            let avatar = undefined;

            try {
                let titles = infos['titles_users'].filter(function (value: any) { return (value['selected'] == true) });

                if (titles.length > 0) {
                    let title = infos['titles'].filter(function (value: any) { return (value['id'] == titles[0]['title_id']) });

                    if (title.length > 0) {
                        displayName = title[0]['name'];
                        displayName = displayName.replace("%login", loginname);
                    }
                }
            }
            catch (error) { }

            try {
                if (infos['image']['versions']['small'] != undefined)
                    avatar = infos['image']['versions']['small'];

                else if (infos['image']['link'] != undefined)
                    avatar = infos['image']['link'];
            }
            catch (error) { }

            try {
                color = infos['coalition_id'];
            }
            catch (error) { }


            const user = await this.usersService.apiCreate(loginname, displayName, color, avatar);

            const loggedUser: LoggedUserDto = {
                id: user.id,
                login_name: user.login_name,
                pseudo: user.pseudo,
                color: color,
                avatar_url: user.avatar_url,
                is_admin: user.is_admin,
            };

            return loggedUser;
        }
        return null
    }

    async login(user: LoggedUserDto) {
        const access_token = this.jwtService.sign(user);

        return { ...user, access_token: access_token };
    }

}
