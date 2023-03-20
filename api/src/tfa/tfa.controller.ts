import { Controller, Response, Request, Body, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AllowLogged, AllowPublic } from '../auth/auth.decorators';
import { TfaService } from './tfa.service';

@Controller('api/tfa')
@ApiTags('api/tfa')
export class TfaController { 

	constructor(private tfaService: TfaService) { }

    @Get('activate')
	@AllowLogged()
    async activate(@Response() res: any, @Request() req: any): Promise<any> {
        const secret: string = await this.tfaService.generateTfaSecret(req.user.id);
        return this.tfaService.displayQrCode(secret, req.user.id, res);
    }

    @Post('confirm-activation')
    @AllowLogged()
    async confirmActivation(@Body() body: any, @Request() req: any): Promise<void> {
        this.tfaService.confirmActivation(req.user.id, body.tfa_code);
    }

    @Get('deactivate')
    @AllowLogged()
    async deactivate(@Request() req: any): Promise<void> {
        this.tfaService.deactivate(req.user.id);
    }

    // vue que route est en AllowPublic, possibilite de mettre une limite de tentatives pour eviter un brutforce sur /api/authenticate avec des paires de id-code
    @Post('authenticate')
    @AllowPublic()
    async authenticateApi(@Body() body: any): Promise<any> {
        return this.tfaService.authenticateApi(body.id, body.tfa_code);
    }

}
