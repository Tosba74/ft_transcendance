
import { Controller, Request, Response, Get, Post, UseGuards, UnauthorizedException, Body, BadRequestException, Redirect, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import axios from 'axios';

import { LocalAuthGuard } from './auth-strategy/local-auth.guard';

import { LoggedUserDto } from './dto/logged_user.dto';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

import { AllowLogged, AllowPublic } from './auth.decorators';
import { IsLoginNameAlreadyExistConstraint } from 'src/users/validation/is-user-already-exist';
import { Oauth2Dto } from './dto/oauth2.dto';
import { DataSource } from 'typeorm';

@Controller('api/login')
@ApiTags('api/login')
export class AuthController {

    constructor(private authService: AuthService, private readonly usersService: UsersService) { }
    private states: Array<string> = [];


    @AllowPublic()
    @UseGuards(LocalAuthGuard)
    @Post('basic')
    async basicLogin(@Request() req: any): Promise<any> {

        // if the 2fa is turned off, directly respond with a new jwt token with full access
        if (req.user.tfa_enabled === false)
            return this.authService.login(req.user);
        
        // const secret: string | undefined = await this.usersService.getTfaSecret(req.user.id);
        // if (secret === '' || secret === undefined)
        //     throw new BadRequestException('Tfa error: tfa is enabled but secret is not defined');

        // no token, ask tfa code
        return {id: req.user.id};
    }


    @Get('apisignin')
    @AllowPublic()
    @Redirect()
    async apiRedirect(): Promise<any> {

        var authorize_url = process.env.API_AUTHORIZE;
        var redirect_url = process.env.API_REDIRECT_URL;
        var randomstring = require('randomstring');

        var state: string = randomstring.generate(15);
        this.states.push(state);

        const url = `${authorize_url}?client_id=${process.env.API_UID}&redirect_uri=${redirect_url}&scope=public&response_type=code&state=${state}`;
        return { statusCode: HttpStatus.FOUND, url };
    }


    @Post('apicallback')
    @AllowPublic()
    async apiLogin(@Body() oauth2Dto: Oauth2Dto): Promise<any> {

        const api_uid = process.env.API_UID;
        const api_secret = process.env.API_SECRET;

        try {
            // This authorization code is then exchanged for an access token using a server-to-server call from the application to the authorization server.
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
            })

            try {
                const coal_data: any = await axios.get(`https://api.intra.42.fr/v2/users/${datas.data.login}/coalitions_users`, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                });

                coal_data.data.forEach(function (element: any) {
                    if (element['coalition_id'] >= 191 && element['coalition_id'] <= 193)
                        datas.data['coalition_id'] = element['coalition_id'];
                });
            }
            catch (error) {}

            // If the state don't match the randomstring generated, the request has been created by a third party and the process should be aborted.
            const index: number = this.states.findIndex(el => el === oauth2Dto.state);
            if (index == -1) {
                throw new BadRequestException('State doesn\'t exists');
            }
            this.states.splice(index, 1);


            const user = await this.authService.validateOrCreateUser(datas.data.login, datas.data);

            if (user) {
                return this.authService.login(user);
            }
            throw new UnauthorizedException('Api user validation error');
        }
        catch (AxiosError) {
            throw new UnauthorizedException('Api 42 connection error');
        }

    }


    //--------------------------------------------


    @AllowLogged()
    @Get('tfa/activate')
    async activate(@Response() res: any, @Request() req: any) {
        // generate a tfa_secret and store it in db and set tfa_enable to true
        const otpAuthUrl: string = await this.authService.generateTfaSecret(req.user.id);
        
        // generate and return a qrcode associated with the tfa_secret
        return this.authService.pipeQrCodeStream(res, otpAuthUrl);
    }


    // async turnOffTfa (@Request() req: any, @Body() body: any): Promise<LoggedUserDto> {}


    // user looks up the Authenticator application code and sends it to the /tfa/authenticate endpoint
    @AllowPublic()
    // @UseGuards(LocalAuthGuard) // LocalAuthGuard se charge de creer un LoggedUser et de le mettre dans Request (req.user)
    @Post('tfa/authenticate')
    async authenticateApi(@Body() body: any): Promise<any> {
        const isCodeValid: boolean = await this.authService.isTfaValid(body.tfa_code, body.id);
        if (!isCodeValid) {
            throw new UnauthorizedException('Wrong authentication code');
        }

        const user = await this.usersService.findOneById(body.id);
        const loggedUser: LoggedUserDto = {
            id: user.id,
            login_name: user.login_name,
            pseudo: user.pseudo,
            color: user.color,
            avatar_url: user.avatar_url,
            tfa_enabled: user.tfa_enabled,
            is_admin: user.is_admin,
        };
        return this.authService.login(loggedUser, true);
    }

}