import { Controller, HttpCode, Param, Body, Get, Post, Put, Delete, UseFilters, ParseIntPipe, UseGuards, Request, } from '@nestjs/common';
import { ApiOkResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiNoContentResponse, ApiUnprocessableEntityResponse, ApiTags, ApiBadRequestResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../_common/filters/http-exception.filter';

import { AllowLogged, AllowPublic } from 'src/auth/auth.decorators';
import { MeService } from './me.service';



@Controller('api/login')
@ApiTags('api/login')
export class MeController {
    constructor(private meService: MeService) { }

    
    @AllowLogged()
    @Get('profile')
    getProfile(@Request() req: any) {
        return req.user;
    }
}