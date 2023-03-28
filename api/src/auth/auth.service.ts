
import { Injectable, BadRequestException, forwardRef, Inject } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UserModel } from '../users/models/user.model';

import { LoggedUserDto } from './dto/logged_user.dto';
import { title } from 'process';

import { TfaService } from 'src/tfa/tfa.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService, @Inject(forwardRef(() => TfaService)) private tfaService: TfaService) { }
    private states: Array<string> = [];

    async validateUser(loginname: string, password: string): Promise<LoggedUserDto | null> {
        
        const user: UserModel = await this.usersService.findOneByLoginName(loginname);

        if (user && user.password && await bcrypt.compare(password, user.password)) {

            // const loggedUser = user as LoggedUserDto;

            // const loggedUser: LoggedUserDto = {
            //     id: user.id,
            //     login_name: user.login_name,
            //     pseudo: user.pseudo,
            //     color: user.color,
            //     avatar_url: user.avatar_url,
            //     tfa_enabled: user.tfa_enabled,
            //     is_admin: user.is_admin,
            // };

            return user as LoggedUserDto;
        }

        return null;
    }

    async signin(loginname: string, password: string): Promise<LoggedUserDto | null> {
    
        return this.usersService.create(loginname, loginname, password);
    }

    async validateOrCreateUser(loginname: string, infos: any = {}): Promise<LoggedUserDto | null> {

        try {
            const user = await this.usersService.findOneByLoginName(loginname);

            // const loggedUser: LoggedUserDto = {
            //     id: user.id,
            //     login_name: user.login_name,
            //     pseudo: user.pseudo,
            //     color: user.color,
            //     avatar_url: user.avatar_url,
            //     tfa_enabled: user.tfa_enabled,
            //     is_admin: user.is_admin,
            // };

            return user as LoggedUserDto;
        }
        catch (NotFoundException) {

            let displayName = loginname;
            let color = -1;
            let avatar = undefined;

            try {
                let titles = infos['titles_users'].filter((value: any) => { return (value['selected'] == true) });

                if (titles.length > 0) {
                    let title = infos['titles'].filter((value: any) => { return (value['id'] == titles[0]['title_id']) });

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

            // const loggedUser: LoggedUserDto = {
            //     id: user.id,
            //     login_name: user.login_name,
            //     pseudo: user.pseudo,
            //     color: user.color,
            //     avatar_url: user.avatar_url,
            //     tfa_enabled: user.tfa_enabled,
            //     is_admin: user.is_admin,
            // };

            return user as LoggedUserDto;
        }
        return null;
    }

    async login(user: LoggedUserDto) {
        const access_token = this.jwtService.sign({ id: user.id, login_name: user.login_name, is_admin: user.is_admin });
        return { access_token: access_token };
    }

    addState(state: string) {
        this.states.push(state);
    }

    checkState(state: string) {
        const index: number = this.states.findIndex(el => el === state);
        if (index == -1) {
            throw new BadRequestException('State doesn\'t exists');
        }
        this.states.splice(index, 1);
    }

    addAttempt(id: number) {
        this.tfaService.addAttempt(id);
    }

}