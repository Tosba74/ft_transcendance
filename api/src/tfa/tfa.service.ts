import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { LoggedUserDto } from '../auth/dto/logged_user.dto';
import { UsersService } from '../users/users.service';

import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';
import { Response } from 'express';

@Injectable()
export class TfaService {

	constructor(private usersService: UsersService) { }
	
	async setTfaSecret(id: number): Promise<string> {
        const secret: string = authenticator.generateSecret();
        const user: LoggedUserDto = await this.usersService.findOneById(id);
        this.usersService.setTfaSecret(secret, user.id);
        return secret;
    }

    async displayQrCode(secret: string, id: number, stream: Response): Promise<any> {
        let appname = process.env.GOOGLE_AUTH_APP_NAME;
        if (!appname || appname === '')
            appname = 'Pong';

        const user: LoggedUserDto = await this.usersService.findOneById(id);
        const otpauthUrl: string = authenticator.keyuri(user.login_name, appname, secret);

        return toFileStream(stream, otpauthUrl);
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
