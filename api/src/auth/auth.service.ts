
import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException } from '@nestjs/common';

import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';
import { Response } from 'express';
import { UserModel } from '../users/models/user.model';

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
                is_tfa: false
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
                is_tfa: false
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
                is_tfa: false
            };

            return loggedUser;
        }
        return null
    }
    
    // isTfa allows to distinguish between tokens created with and without two-factor authentication
    async login(user: any, is_tfa: boolean = false) {   
        if (is_tfa == true)
        {
            // allows replacement of token datas
            user.is_tfa = true;
            delete user.exp;
            delete user.iat;
        }
        const access_token = this.jwtService.sign(user);
        return {...user, access_token: access_token};
    }
    
    //--------------------------------------------

    async generateTfaSecret(user: any): Promise<string> {
        const secret: string = authenticator.generateSecret();
        const appname: string | undefined = process.env.AUTH_APP_NAME;
        if (!appname)
            throw new InternalServerErrorException();
        else
        {
            const otpauthUrl: string = authenticator.keyuri(user.tfa_email, appname, secret);

            // save the generated secret in the database
            await this.usersService.setTfaSecret(secret, user.userId);

            return otpauthUrl;
        }
    }

    async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
        return toFileStream(stream, otpauthUrl);
    }

    async isTfaValid(tfaCode: string, user: UserModel) {
        const tfa_secret: string = await this.usersService.getTfaSecret(user.id);
        return authenticator.verify({
            token: tfaCode,
            secret:  tfa_secret
        });
    }

}
