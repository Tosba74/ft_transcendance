
import { Injectable, UnauthorizedException, InternalServerErrorException, BadRequestException, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';

import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';
import { Response } from 'express';
import { UserModel } from '../users/models/user.model';

import { LoggedUserDto } from './dto/logged_user.dto';
import { title } from 'process';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async validateUser(loginname: string, password: string): Promise<LoggedUserDto | null> {

        const user: UserModel = await this.usersService.findOneByLoginName(loginname);

        if (user && user.password && await bcrypt.compare(password, user.password)) {

            // const loggedUser = user as LoggedUserDto;

            const loggedUser: LoggedUserDto = {
                id: user.id,
                login_name: user.login_name,
                pseudo: user.pseudo,
                color: user.color,
                avatar_url: user.avatar_url,
                tfa_enabled: user.tfa_enabled,
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
                tfa_enabled: user.tfa_enabled,
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
                tfa_enabled: user.tfa_enabled,
                is_admin: user.is_admin,
            };

            return loggedUser;
        }
        return null;
    }
    
    async login(user: any, is_tfa: boolean = false) {   
        if (is_tfa == true)
        {
            // allows replacement of token datas
            delete user.exp;
            delete user.iat;
        }
        const access_token = this.jwtService.sign(user);
        return {...user, is_tfa: is_tfa, access_token: access_token};
    }

    // revoke jwt token ?
    // async logout(user: any) { }
    
    //--------------------------------------------

    async generateTfaSecret(user: any): Promise<string> {
        const secret: string = authenticator.generateSecret();
        const appname: string | undefined = process.env.AUTH_APP_NAME;
        if (!appname)
            throw new InternalServerErrorException();
        else
        {
            const otpauthUrl: string = authenticator.keyuri(user.tfa_email, appname, secret);

            // save the secret (associated with the qrcode) in the database
            await this.usersService.setTfaSecret(secret, user.userId);
            return otpauthUrl;
        }
    }

    async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
        return toFileStream(stream, otpauthUrl);
    }

    async isTfaValid(tfaCode: string, user: UserModel) {
        const tfa_secret: string | undefined = await this.usersService.getTfaSecret(user.id);
        
        if (tfa_secret === '' || tfa_secret === undefined || user.tfa_enabled === false)
            throw new UnauthorizedException('TFA not activated');

        return authenticator.verify({
            token: tfaCode,
            secret:  tfa_secret
        });
    }

}
