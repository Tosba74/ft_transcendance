
import { Controller, Request, Response, Get, Post, UseGuards, UnauthorizedException, Body, Param, BadRequestException, Redirect } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LocalAuthGuard } from './auth-strategy/local-auth.guard';
import { ApiAuthGuard } from './auth-strategy/api-auth.guard';

import { LoggedUserDto } from './dto/logged_user.dto';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

import { AllowLogged, AllowPublic } from './auth.decorators';

@Controller('api/login')
@ApiTags('api/login')
export class AuthController {
    constructor(private authService: AuthService, private readonly usersService: UsersService) { }

    @AllowPublic()
    @UseGuards(LocalAuthGuard)
    @Post('basic')
    async basicLogin(@Request() req: any): Promise<any> {

    // if the 2FA is turned off, we give full access to the user

        if (req.user.tfa_enabled === false)
            return this.authService.login(req.user);
        
            const secret: string | undefined = await this.usersService.getTfaSecret(req.user.id);
            if (secret === '' || secret === undefined)
            throw new BadRequestException('Tfa error: tfa is enabled but secret is not defined');
            
    // otherwise, ask 6 digits auth code and send it to /api/login/tfa/authenticate

        // retourne null au front pour lui indiquer de demander le tfaCode de google auth
        return null;
        // le front POST sur localhost:8080/api/login/tfa/authenticate :
            // username: tnanchen
            // password: password
            // tfaCode: 946013
    }

    // user looks up the Authenticator application code and sends it to the /tfa/authenticate endpoint
    // we respond with a new JWT token with full access
    // @AllowLogged()
    @AllowPublic()
    @UseGuards(LocalAuthGuard)
    @Post('tfa/authenticate')
    async authenticate(@Request() req: any, @Body() body: any): Promise<LoggedUserDto> {
        const isCodeValid: boolean = await this.authService.isTfaValid(body.tfaCode, req.user);
        if (!isCodeValid) {
            throw new UnauthorizedException('Wrong authentication code');
        }
        return this.authService.login(req.user, true);
    }
    
    @AllowPublic()
    @UseGuards(ApiAuthGuard)
    @Post('apicallback')
    async apiLogin(@Request() req: any): Promise<LoggedUserDto> {
        return this.authService.login(req.user);
    }
    
    @AllowLogged()
    @Get('profile')
    getProfile(@Request() req: any) {
        return req.user;
    }

    // generate a tfa_secret associated with a qrcode responded by tfa/generate endpoint to add the app in google authenticator
    // and set user.tfa_enabled in db
    // actually allows to regenerate qrcode-secret (maybe set another route for that)
    @AllowLogged()
    @UseGuards(LocalAuthGuard)
    @Post('tfa/activate')
    async activate(@Response() res: any, @Request() req: any) {
        const otpAuthUrl: string = await this.authService.generateTfaSecret(req.user);

        await this.usersService.turnOnTfa(req.user.id);

        return this.authService.pipeQrCodeStream(res, otpAuthUrl);
    }

    // async turnOffTfa (@Request() req: any, @Body() body: any): Promise<LoggedUserDto> {}

}
