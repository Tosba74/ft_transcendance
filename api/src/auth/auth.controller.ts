
import { Controller, Request, Response, Get, Post, UseGuards, UnauthorizedException, Body, BadRequestException } from '@nestjs/common';
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
    async basicLogin(@Request() req: any): Promise<LoggedUserDto> {
        
        // si user.tfa_enabled === true && user.tfa_secret
            // recevoir les username et password (local.strategy)
            // checker que ca match avec la db (local.strategy)

            // rediriger sur /api/login/tfa/authenticate sans AppGuard (ou en modifiant AppGuard) mais avec un autre mechanisme de verification (juste LocalAuthGuard ?)
            

        // if the 2FA is turned off, we give full access to the user
        return this.authService.login(req.user);
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

    //--------------------------------------------

    // generate a tfa_secret associated with a qrcode responded by tfa/generate endpoint to add the app in google authenticator
    // and set user.tfa_enabled in db
    @AllowLogged()
    @UseGuards(LocalAuthGuard)
    @Post('tfa/activate')
    async activate(@Response() res: any, @Request() req: any) {
        const otpAuthUrl: string = await this.authService.generateTfaSecret(req.user);

        await this.usersService.turnOnTfa(req.user.id);

        return this.authService.pipeQrCodeStream(res, otpAuthUrl);
    }

    // async turnOffTfa (@Request() req: any, @Body() body: any): Promise<LoggedUserDto> {}

    // user looks up the Authenticator application code and sends it to the /tfa/authenticate endpoint
    // we respond with a new JWT token with full access
    @AllowLogged()
    @UseGuards(LocalAuthGuard)
    @Post('tfa/authenticate')
    async authenticate(@Request() req: any, @Body() body: any): Promise<LoggedUserDto> {
        const isCodeValid: boolean = await this.authService.isTfaValid(body.tfaCode, req.user);
        if (!isCodeValid) {
            throw new UnauthorizedException('Wrong authentication code');
        }
        return this.authService.login(req.user, true);
    }

}
