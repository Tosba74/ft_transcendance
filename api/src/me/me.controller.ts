import { Controller, HttpCode, Param, Body, Get, Post, Put, Delete, UseFilters, ParseIntPipe, UseGuards, Request, } from '@nestjs/common';
import { ApiOkResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiNoContentResponse, ApiUnprocessableEntityResponse, ApiTags, ApiBadRequestResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/_common/filters/http-exception.filter';

import { AllowLogged, AllowPublic } from 'src/auth/auth.decorators';
import { MeService } from './me.service';
import { LoggedUserDto } from 'src/auth/dto/logged_user.dto';



@Controller('api/me')
@ApiTags('api/me')
@AllowLogged()
export class MeController {
    constructor(private meService: MeService) { }

    
    @Get()
    @ApiOkResponse({ description: 'User infos retrieved successfully', type: LoggedUserDto})
    getMe(@Request() req: any): LoggedUserDto {
        return req.user as LoggedUserDto;
    }

    // @Get()
    // public findAll(): Promise<FriendModel[]> {
    //     return this.friendsService.findAll();
    // }
    
    
    // @Get('friends')
    // @ApiOkResponse({ description: 'Friends retrieved successfully', type: FriendModel, isArray: true})
    // getFriends(@Request() req: any) {
    //     return req.user;
    // }
}