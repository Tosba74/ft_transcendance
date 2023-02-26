
import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LoggedUserDto } from './dto/logged_user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

import { AllowLogged, AllowPublic } from './auth.decorators';

@Controller('api/login')
@ApiTags('api/login')
export class AuthController {
    constructor(private authService: AuthService) { }

    @AllowPublic()
    @UseGuards(LocalAuthGuard)
    @Post('basic')
    async login(@Request() req: any): Promise<LoggedUserDto> {
        return this.authService.login(req.user);
    }
    
    @AllowLogged()
    @Get('profile')
    getProfile(@Request() req: any) {
        return req.user;
    }
}
