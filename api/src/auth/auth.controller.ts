import { Controller, Request, Get, Post, UseGuards, UnauthorizedException, Body, Redirect, HttpStatus, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import axios from 'axios';

import { LocalAuthGuard } from './auth-strategy/local-auth.guard';

import { AuthService } from './auth.service';

import { AllowLogged, AllowPublic } from './auth.decorators';
import { IsLoginNameAlreadyExistConstraint } from 'src/users/validation/is-user-already-exist';
import { Oauth2Dto } from './dto/oauth2.dto';
import { DataSource } from 'typeorm';
import { LoggedUserDto } from './dto/logged_user.dto';

@Controller('api/login')
@ApiTags('api/login')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('basic')
    @AllowPublic()
    @UseGuards(LocalAuthGuard)
    async basicLogin(@Request() req: any, @Res({ passthrough: true }) response: any): Promise<any> {

        if (process.env.BUILD_TYPE != "Production") {

            const user = req.user as LoggedUserDto;

            if (user.tfa_enabled === false)
                return this.authService.login(user);

            response.status(206);
            this.authService.addAttempt(user.id);
            return { id: user.id };
        }

        throw new UnauthorizedException('Disabled in prod');
    }

    @Post('create')
    @AllowPublic()
    async basicSignin(@Body() body: { username: string, password: string }): Promise<any> {

        if (process.env.BUILD_TYPE != "Production") {

            return this.authService.signin(body.username, body.password);

        }

        throw new UnauthorizedException('Disabled in prod');
    }


    @Get('refresh_token')
    @AllowLogged()
    async refreshToken(@Request() req: any): Promise<any> {
        delete req.user.exp;
        delete req.user.iat;
        return this.authService.login(req.user as LoggedUserDto);
    }


    @Get('apisignin')
    @AllowPublic()
    @Redirect()
    async apiRedirect(): Promise<any> {

        var authorize_url = process.env.API_AUTHORIZE;
        var redirect_url = process.env.API_REDIRECT_URL;
        var randomstring = require('randomstring');

        var state: string = randomstring.generate(15);
        this.authService.addState(state);

        const url = `${authorize_url}?client_id=${process.env.API_UID}&redirect_uri=${redirect_url}&scope=public&response_type=code&state=${state}`;
        return { statusCode: HttpStatus.FOUND, url };
    }


    @Post('apicallback')
    @AllowPublic()
    async apiLogin(@Body() oauth2Dto: Oauth2Dto, @Res({ passthrough: true }) response: any): Promise<any> {
        this.authService.checkState(oauth2Dto.state);

        try {
            const token_request: any = await axios.post('https://api.intra.42.fr/oauth/token', {
                grant_type: 'authorization_code',
                client_id: process.env.API_UID,
                client_secret: process.env.API_SECRET,
                code: oauth2Dto.code,
                redirect_uri: process.env.API_REDIRECT_URL,
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const access_token: string = token_request.data.access_token;

            const datas: any = await axios.get('https://api.intra.42.fr/v2/me', {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });

            try {
                const coal_data: any = await axios.get(`https://api.intra.42.fr/v2/users/${datas.data.login}/coalitions_users`, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                });

                coal_data.data.forEach((element: any) => {
                    if (element['coalition_id'] >= 191 && element['coalition_id'] <= 193)
                        datas.data['coalition_id'] = element['coalition_id'];
                });
            }
            catch (error) { }

            const user = await this.authService.validateOrCreateUser(datas.data.login, datas.data);

            if (user) {
                if (user.tfa_enabled === false) {
                    return this.authService.login(user);
                }
                response.status(206);
                this.authService.addAttempt(user.id);
                return { id: user.id };
            }
            throw new UnauthorizedException('Api user validation error');
        }
        catch (AxiosError) {
            throw new UnauthorizedException('Api 42 connection error');
        }

    }

}