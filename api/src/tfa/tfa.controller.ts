import { Controller, Response, Request, Body, Get, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AllowLogged, AllowPublic } from '../auth/auth.decorators';

import { TfaService } from './tfa.service';
import { AuthService } from '../auth/auth.service';
import { LoggedUserDto } from '../auth/dto/logged_user.dto';
import { UsersService } from '../users/users.service';


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


    // vue que route est en AllowPublic, possibilite de mettre une limite de tentative pour eviter un brutforce
    // car route authenticate utilise que une paire id-tfacode
    @AllowPublic()
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
        return this.authService.login(loggedUser, true);
    }

}
