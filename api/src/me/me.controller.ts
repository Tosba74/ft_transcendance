import { Controller, Res, HttpCode, Param, Body, Get, Post, Put, Delete, UseFilters, ParseIntPipe, UseGuards, Request, StreamableFile } from '@nestjs/common';
import { ApiOkResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiNoContentResponse, ApiUnprocessableEntityResponse, ApiTags, ApiBadRequestResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/_common/filters/http-exception.filter';

import { AllowLogged, AllowPublic } from 'src/auth/auth.decorators';
import { MeService } from './me.service';
import { LoggedUserDto } from 'src/auth/dto/logged_user.dto';
import { UserModel } from 'src/users/models/user.model';

import { createReadStream } from 'fs';
import { join } from 'path';
import type { Response } from 'express';
import { extname } from 'path';

@Controller('api/me')
@ApiTags('api/me')
@AllowLogged()
@UseFilters(HttpExceptionFilter)
export class MeController {
    constructor(private meService: MeService) { }
    
    @Get()
    @ApiOkResponse({ description: 'User infos retrieved successfully', type: LoggedUserDto})
    getMe(@Request() req: any): LoggedUserDto {
        return req.user as LoggedUserDto;
    }


    @Get('avatar')
    @AllowLogged()
    @ApiCreatedResponse({ description: 'Avatar retrieved successfully', type: UserModel })
    getFile(@Request() req: any, @Res({ passthrough: true }) res: Response): StreamableFile {
  
      // check si image existe, sinon envoie default avatar
      
      const path = req.user.avatar_url;
      const extension: string = extname(path);

      res.set({'Content-Type': `image/${extension}`});
  
      const file = createReadStream(path, {encoding: "base64"});
      return new StreamableFile(file);
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