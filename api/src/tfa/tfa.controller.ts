import { Controller, Response, Request, Body, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoggedUserDto } from 'src/auth/dto/logged_user.dto';
import { AllowLogged, AllowPublic } from '../auth/auth.decorators';
import { TfaService } from './tfa.service';

@Controller('api/tfa')
@ApiTags('api/tfa')
export class TfaController {
    constructor(private tfaService: TfaService) { }
    
    @Get('turn-off')
    @AllowLogged()
    async turnOff(@Request() req: any): Promise<string> {
        const user = req.user as LoggedUserDto;

        return this.tfaService.deactivate(user.id);
    }
    
    @Get('turn-on')
    @AllowLogged()
    async turnOn(@Response() res: any, @Request() req: any): Promise<any> {
        const user = req.user as LoggedUserDto;

        const secret: string = await this.tfaService.generateTfaSecret(user.id);
        return this.tfaService.displayQrCode(secret, user.id, res);
    }
    
    @Post('confirm-activation')
    @AllowLogged()
    async confirmActivation(@Body() body: { id: number, tfa_code: string }, @Request() req: any): Promise<boolean> {
        return this.tfaService.confirmActivation(req.user.id, body.tfa_code);
    }
    
    @Post('authenticate')
    @AllowPublic()
    async authenticateApi(@Body() body: { id: number, tfa_code: string }): Promise<any> {
        return this.tfaService.authenticateApi(body.id, body.tfa_code);
    }

}