
import { Controller, Request, Response, Get, Post, UseGuards, UnauthorizedException, Body, HttpCode } from '@nestjs/common';
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

    //--------------------------------------------
    // if the 2FA is turned off, we give full access to the user

    @AllowPublic()
    @UseGuards(LocalAuthGuard)
    @Post('basic')
    async basicLogin(@Request() req: any): Promise<LoggedUserDto> {
        return this.authService.login(req.user);

        // si user.tfa_enabled === true
            // recevoir username et password
            // checker que ca match avec la db
            // rediriger sur /api/login/tfa/authenticate
    }
    
    @AllowPublic()
    @UseGuards(ApiAuthGuard) 
    @Post('apicallback')
    async apiLogin(@Request() req: any): Promise<LoggedUserDto> {
        return this.authService.login(req.user);
    }
    
    @AllowLogged()
    @Get('profile')
    @UseGuards(LocalAuthGuard)
    getProfile(@Request() req: any) {
        return req.user;
    }

    //--------------------------------------------

    // genere tfa_code associe a un qrcode pour ajouter l'app a google authenticator
    @AllowLogged()
    @Post('tfa/generate')
    async register(@Response() res: any, @Request() req: any) {
        const otpAuthUrl: string = await this.authService.generateTfaSecret(req.user);
        return this.authService.pipeQrCodeStream(res, otpAuthUrl);
    }

    // activate 2fa sending a first valid code to the /tfa/turn-on endpoint
    @AllowLogged()
    @UseGuards(LocalAuthGuard)
    @Post('tfa/turn-on')
    async turnOnTfa(@Request() req: any, @Body() body: any): Promise<LoggedUserDto> {
        const isCodeValid: boolean = await this.authService.isTfaValid(body.tfaCode, req.user, true);
        if (!isCodeValid) {
            throw new UnauthorizedException('Wrong authentication code');
        }
        await this.usersService.turnOnTfa(req.user.id);
        return this.authService.login(req.user, true);
    }

    // the user looks up the Authenticator application code and sends it to the /tfa/authenticate endpoint
    // we respond with a new JWT token with full access
    @AllowLogged()
    @UseGuards(LocalAuthGuard)
    @Post('tfa/authenticate')
    async authenticate(@Request() req: any, @Body() body: any): Promise<LoggedUserDto> {
        const isCodeValid: boolean = await this.authService.isTfaValid(body.tfaCode, req.user, false);
        if (!isCodeValid) {
            throw new UnauthorizedException('Wrong authentication code');
        }
        return this.authService.login(req.user, true);
    }

}
