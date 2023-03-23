import { Controller, Response, Request, Body, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AllowLogged, AllowPublic } from '../auth/auth.decorators';
import { TfaService } from './tfa.service';

@Controller('api/tfa')
@ApiTags('api/tfa')
export class TfaController { 
	constructor(private tfaService: TfaService) { }

    @Get('turn-on')
	@AllowLogged()
    async turnOn(@Response() res: any, @Request() req: any): Promise<any> {
        const secret: string = await this.tfaService.generateTfaSecret(req.user.id);
        return this.tfaService.displayQrCode(secret, req.user.id, res);
    }

    @Post('confirm-activation')
    @AllowLogged()
    async confirmActivation(@Body() body: any, @Request() req: any): Promise<boolean> {
        return this.tfaService.confirmActivation(req.user.id, body.tfa_code);
    }

    @Get('turn-off')
    @AllowLogged()
    async turnOff(@Request() req: any): Promise<string> {
        return this.tfaService.deactivate(req.user.id);
    }

    // METTRE UNE CRON QUI EFFACE, chaque 15', TOUS LES id DE l'array this.tfaService.blocked
    @Post('authenticate')
    @AllowPublic()
    async authenticateApi(@Body() body: any): Promise<any> {
        return this.tfaService.authenticateApi(body.id, body.tfa_code);
    }

}