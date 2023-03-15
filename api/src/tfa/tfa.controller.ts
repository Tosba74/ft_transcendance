import { Controller, Response, Request, Body, Get, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AllowLogged, AllowPublic } from '../auth/auth.decorators';

import { TfaService } from './tfa.service';
import { AuthService } from '../auth/auth.service';
import { LoggedUserDto } from '../auth/dto/logged_user.dto';
import { UsersService } from '../users/users.service';

// la partie confirmation pour le qr code devrait être dans la partie user et appeler les fonctions du module 2fa


@Controller('api/tfa')
@ApiTags('api/tfa')
export class TfaController { 

	constructor(
		private tfaService: TfaService, 
		private readonly usersService: UsersService,
		private authService: AuthService
	) { }

	@AllowLogged()
    @Get('activate')
    async activate(@Response() res: any, @Request() req: any) {
        // generate a tfa_secret and store it in db and set tfa_enable to true
        const otpAuthUrl: string = await this.tfaService.generateTfaSecret(req.user.id);
        
        // generate and return a qrcode associated with the tfa_secret
        return this.tfaService.pipeQrCodeStream(res, otpAuthUrl);
    }


    // async turnOffTfa (@Request() req: any, @Body() body: any): Promise<LoggedUserDto> {}


    // user looks up the Authenticator application code and sends it to the /tfa/authenticate endpoint
    @AllowPublic()
    // @UseGuards(LocalAuthGuard) // LocalAuthGuard se charge de creer un LoggedUser et de le mettre dans Request (req.user)
    @Post('authenticate')
    async authenticateApi(@Body() body: any): Promise<any> {
        const isCodeValid: boolean = await this.tfaService.isTfaValid(body.tfa_code, body.id);
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
        // return this.tfaService.login(loggedUser, true);
        return this.authService.login(loggedUser, true);
    }

}
