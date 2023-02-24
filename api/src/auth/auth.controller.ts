
import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

import { LoggedUserDto } from './dto/logged_user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
// import { PublicGuard } from './public.guard';
// import { LoggedGuard } from './logged.guard';
import { AllowLogged, AllowPublic } from './auth.decorators';

@Controller('api/login')
@ApiTags('api/login')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Get()
    getHello(): string {
        return 'Hello World!';
    }

    @UseGuards(LocalAuthGuard)
    // @AllowPublic()
    @Post('basic')
    async login(@Request() req: any): Promise<any> {
        return this.authService.login(req.user);
    }
    
    @UseGuards(JwtAuthGuard)
    // @AllowPublic()
    @Get('profile')
    getProfile(@Request() req: any) {
        console.log(req.user);
        return req.user;
    }
   /* 

    @AllowPublic()
    // @UseGuards(PublicGuard)
    @Get('test1')
    getPub(@Request() req: any) {
        return 'cheese';
    }
    
    
    @AllowLogged()
    // @UseGuards(LoggedGuard)

    @Get('test2')
    getLog(@Request() req: any) {
        return 'loolo';
    }
    

    @Get('test3')
    getAdm(@Request() req: any) {
        return 'adadds';
    }*/

}
