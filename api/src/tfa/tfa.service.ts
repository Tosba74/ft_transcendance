import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

import { LoggedUserDto } from '../auth/dto/logged_user.dto';
import { UsersService } from '../users/users.service';

import { AuthService } from 'src/auth/auth.service';

import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';
import { Response } from 'express';

@Injectable()
export class TfaService {

	constructor(private usersService: UsersService, private authService: AuthService) { }
	
    // demander le code pour confirmer la desactivation ?
    async deactivate(id: number): Promise<string> {
        this.usersService.setTfaEnabled(id);
        this.usersService.setTfaSecret('', id);
        return 'disabled';
    }

	async generateTfaSecret(id: number): Promise<string> {
        const secret: string = authenticator.generateSecret();
        const user: LoggedUserDto = await this.usersService.findOneById(id);
        this.usersService.setTfaSecret(secret, user.id);
        return secret;
    }

    async displayQrCode(secret: string, id: number, stream: Response): Promise<any> {
        let appname = process.env.AUTH_APP_NAME;
        if (!appname || appname === '')
            appname = 'Pong';

        const user: LoggedUserDto = await this.usersService.findOneById(id);
        const otpauthUrl: string = authenticator.keyuri(user.login_name, appname, secret);

        return toFileStream(stream, otpauthUrl);
    }

    async confirmActivation(id: number, tfa_code: string): Promise<boolean> {
        const isCodeValid: boolean = await this.isTfaValid(tfa_code, id);
        if (!isCodeValid)
            throw new UnauthorizedException('Wrong authentication code');
        
        return this.usersService.setTfaEnabled(id);
    }

    async authenticateApi(id: number, tfa_code: string) {
        const isCodeValid: boolean = await this.isTfaValid(tfa_code, id);
        if (!isCodeValid)
            throw new UnauthorizedException('Wrong authentication code');
    
        const user = await this.usersService.findOneById(id);
        const loggedUser: LoggedUserDto = {
            id: user.id,
            login_name: user.login_name,
            pseudo: user.pseudo,
            color: user.color,
            avatar_url: user.avatar_url,
            tfa_enabled: user.tfa_enabled,
            is_admin: user.is_admin,
        };
        return this.authService.login(loggedUser);
    }

    async isTfaValid(tfa_code: string, id: number): Promise<boolean> {
        const tfa_secret: string | undefined = await this.usersService.getTfaSecret(id);
        
        if (tfa_secret === '' || tfa_secret === undefined)
            throw new InternalServerErrorException('TFA error');

        return authenticator.verify({
            token: tfa_code,
            secret:  tfa_secret
        });
    }

}
