
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

        // IF THE 2FA IS TURNED OFF, DIRECTLY RESPOND WITH A NEW JWT TOKEN WITH FULL ACCESS

        if (req.user.tfa_enabled === false)
            return this.authService.login(req.user);
        
            const secret: string | undefined = await this.usersService.getTfaSecret(req.user.id);
            if (secret === '' || secret === undefined)
            throw new BadRequestException('Tfa error: tfa is enabled but secret is not defined');
            
        
        // OTHERWISE, ASK 6 DIGITS AUTH CODE AND SEND IT TO /API/LOGIN/TFA/AUTHENTICATE

        // retourne null au front pour lui indiquer de demander le tfaCode de google auth
        return null;
        // le front peut ensuite faire un POST sur localhost:8080/api/login/tfa/authenticate avec en body:
            // username: tnanchen
            // password: password
            // tfaCode: 946013
    }

    // user looks up the Authenticator application code and sends it to the /tfa/authenticate endpoint
    @AllowPublic()
    @UseGuards(LocalAuthGuard)
    @Post('tfa/authenticate')
    async authenticate(@Request() req: any, @Body() body: any): Promise<LoggedUserDto> {
        const isCodeValid: boolean = await this.authService.isTfaValid(body.tfaCode, req.user);
        if (!isCodeValid) {
            throw new UnauthorizedException('Wrong authentication code');
        }

        // respond with a new JWT token with full access
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

    // (actually allows to re-generate multiple secret-qrcode, maybe externalise this possibility in another route)
    @AllowLogged()
    @UseGuards(LocalAuthGuard)
    @Post('tfa/activate')
    async activate(@Response() res: any, @Request() req: any) {
        // generate a tfa_secret and store it in db
        const otpAuthUrl: string = await this.authService.generateTfaSecret(req.user);
        
        // set tfa_enable to true
        await this.usersService.enableTfa(req.user.id);
        
        // generate and return a qrcode associated with the tfa_secret
        return this.authService.pipeQrCodeStream(res, otpAuthUrl);
    }

    // async turnOffTfa (@Request() req: any, @Body() body: any): Promise<LoggedUserDto> {}

}
