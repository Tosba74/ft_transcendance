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

    @Get('activate')
	@AllowLogged()
    async activate(@Response() res: any, @Request() req: any): Promise<any> {
        const secret: string = await this.tfaService.setTfaSecret(req.user.id);
        return this.tfaService.displayQrCode(secret, req.user.id, res);
    }

    @Post('confirm-activation')
    @AllowLogged()
    async confirm(@Body() body: any, @Request() req: any): Promise<void> {
        const id = req.user.id;

        const isCodeValid: boolean = await this.tfaService.isTfaValid(body.tfa_code, id);
        if (!isCodeValid)
            throw new UnauthorizedException('Wrong authentication code');
        
        this.usersService.enableTfa(id);
    }

    // demander le code pour confirmer la desactivation ?
    @Get('deactivate')
    @AllowLogged()
    async deactivate(@Request() req: any): Promise<any> {
        const id = req.user.id;
        this.usersService.disableTfa(id);
        this.usersService.unsetTfaSecret(id);
    }

    // vue que route est en AllowPublic, possibilite de mettre une limite de tentatives pour eviter un brutforce sur /api/authenticate avec des paires de id-code
    @AllowPublic()
    @Post('authenticate')
    async authenticateApi(@Body() body: any): Promise<any> {
        const id = body.id;

        const isCodeValid: boolean = await this.tfaService.isTfaValid(body.tfa_code, id);
        if (!isCodeValid)
            throw new UnauthorizedException('Wrong authentication code');

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
        return this.authService.login(loggedUser, true);
    }

}
