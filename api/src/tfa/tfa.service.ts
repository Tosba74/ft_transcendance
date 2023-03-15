import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

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
        const appname: string | undefined = process.env.AUTH_APP_NAME;
        if (!appname)
            throw new InternalServerErrorException('Missing app name');
        else
        {
            const user: LoggedUserDto = await this.usersService.findOneById(id);
            const otpauthUrl: string = authenticator.keyuri(user.login_name, appname, secret);

            // save the secret (associated with the qrcode) in the database
            await this.usersService.setTfaSecret(secret, user.id);
            return otpauthUrl;
        }
    }

    async displayQrCode(stream: Response, otpauthUrl: string): Promise<any> {
        return toFileStream(stream, otpauthUrl);
    }

    async isTfaValid(tfa_code: string, id: number): Promise<boolean> {
        const tfa_secret: string | undefined = await this.usersService.getTfaSecret(id);
        
        if (tfa_secret === '' || tfa_secret === undefined)
            throw new UnauthorizedException('TFA not activated');

        return authenticator.verify({
            token: tfa_code,
            secret:  tfa_secret
        });
    }

}
