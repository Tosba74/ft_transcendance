import { Controller, HttpCode, Param, Body, Get, Post, Put, Delete, UseFilters, ParseIntPipe, UseGuards, Request, } from '@nestjs/common';
import { ApiOkResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiNoContentResponse, ApiUnprocessableEntityResponse, ApiTags, ApiBadRequestResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/_common/filters/http-exception.filter';

import { AllowLogged, AllowPublic } from 'src/auth/auth.decorators';
import { MeService } from './me.service';
import { LoggedUserDto } from 'src/auth/dto/logged_user.dto';


import { FriendModel } from 'src/friends/models/friend.model';
import { UserModel } from 'src/users/models/user.model';



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



    @Get('friends')
    @ApiOkResponse({ description: 'Friends retrieved successfully', type: [FriendModel] })
    public listFriendships(@Request() req: any): Promise<UserModel[]> {

        return this.meService.listFriends(req.user as LoggedUserDto);
    }
    
    @Post('friends/:id')
    @ApiCreatedResponse({ description: 'Friend created successfully', type: FriendModel })
    @ApiBadRequestResponse({ description: 'Friend validation error' })
    public createFriendship(@Request() req: any, @Param('id', ParseIntPipe) id: number): Promise<FriendModel> {

        return this.meService.addFriend(req.user as LoggedUserDto, id);
    }

    @Delete('friends/:id')
    @ApiNoContentResponse({ description: 'Friend deleted successfully', type: FriendModel })
    @ApiBadRequestResponse({ description: 'Friend validation error' })
    public deleteFriendship(@Request() req: any, @Param('id', ParseIntPipe) id: number): Promise<FriendModel> {

        return this.meService.addFriend(req.user as LoggedUserDto, id);
    }
}