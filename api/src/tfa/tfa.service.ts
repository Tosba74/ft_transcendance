import { Injectable, Inject, InternalServerErrorException, UnauthorizedException, forwardRef } from '@nestjs/common';

import { LoggedUserDto } from '../auth/dto/logged_user.dto';
import { UsersService } from '../users/users.service';

import { AuthService } from 'src/auth/auth.service';

import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';
import { Response } from 'express';

import { Interval } from '@nestjs/schedule';
import { Attempts, LIMIT_ATTEMPT, TIME_LIMIT_IN_MIN, TIME_LIMIT_IN_MS } from './attempts';

@Injectable()
export class TfaService {
	constructor(private usersService: UsersService, @Inject(forwardRef(() => AuthService)) private authService: AuthService) { }
    private attempts: Map<number, Attempts>;
	
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

    async authenticateApi(id: number, tfa_code: string): Promise<any> {

        let message = '';
        const attempt = this.checkAttempt(id);
        if (attempt === -1)
            throw new UnauthorizedException('Limit of attempts exceeded: retry in a moment');
        else if (attempt === -2)
            throw new UnauthorizedException('Time exceeded: restart login');
        else if (attempt === 2)
            message = `Wrong authentication code: ${attempt} attempts remaining`;
        else if (attempt === 1)
            message = `Wrong authentication code: ${attempt} attempts remaining`;
        else if (attempt === 0)
            message = 'Limit of attempts exceeded: retry in a moment';

        const isCodeValid: boolean = await this.isTfaValid(tfa_code, id);
        if (!isCodeValid)
            throw new UnauthorizedException(message);
    
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

    addAttempt(id: number) {
        const newAttempt: Attempts = {
            login_date: new Date(), 
            attempt_no : 0
        };
        this.attempts.set(id, newAttempt);
    }

    @Interval(TIME_LIMIT_IN_MS)
    removeAttempts() {
        console.log(this.attempts);

        // traverser la map
        // retirer les attemps > 5 min par rapport a now
        this.attempts.forEach((attempt, id) => {
            const minBetweenAttempt = ((new Date()).getTime() - attempt.login_date.getTime() / 1000 / 60);
            if (minBetweenAttempt > TIME_LIMIT_IN_MIN)
                this.attempts.delete(id);
        })
    }

    // chaque 5 min cron qui passe sur this.attempts et retire les attempt > 5 min
    checkAttempt(id: number): number {
        const attempt = this.attempts.get(id);
    
        if (attempt) {
            attempt.attempt_no++;
            if (attempt.attempt_no > LIMIT_ATTEMPT)
                return -1;

            // tentative restantes
            return LIMIT_ATTEMPT - attempt.attempt_no ; // return 2,1,0
        }
        // id n est plus dans attempt, car trop long donc retiré
        return -2;
    }

}
