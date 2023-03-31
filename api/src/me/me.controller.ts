import { Controller, Res, HttpCode, Param, Body, Get, Post, Put, Delete, UseFilters, ParseIntPipe, UseGuards, Request, Patch, UseInterceptors, UploadedFile, StreamableFile } from '@nestjs/common';
import { ApiOkResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiNoContentResponse, ApiUnprocessableEntityResponse, ApiTags, ApiBadRequestResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/_common/filters/http-exception.filter';

import { AllowLogged, AllowPublic } from 'src/auth/auth.decorators';
import { MeService } from './me.service';
import { LoggedUserDto } from 'src/auth/dto/logged_user.dto';

import { createReadStream } from 'fs';
import { join } from 'path';
import type { Response } from 'express';
import { extname } from 'path';

import { FriendModel } from 'src/friends/models/friend.model';
import { UserModel } from 'src/users/models/user.model';
import { BlockedModel } from 'src/blockeds/models/blocked.model';
import { ChatParticipantModel } from 'src/chat_participants/models/chat_participant.model';
import { JoinChatDto } from './dto/join_chat';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UpdatePseudoDto } from './dto/update-pseudo.dto';
import { imageFileFilter } from './validation/file-upload.utils';
import { ChatModel } from 'src/chats/models/chat.model';


@Controller('api/me')
@ApiTags('api/me')
@AllowLogged()
@UseFilters(HttpExceptionFilter)
export class MeController {
    constructor(private meService: MeService) { }

    @Get()
    @ApiOkResponse({ description: 'User infos retrieved successfully', type: LoggedUserDto })
    getMe(@Request() req: any): LoggedUserDto {
        
        return req.user as LoggedUserDto;
    }

    // @Get()
    // public findAll(): Promise<FriendModel[]> {
    //     return this.friendsService.findAll();
    // }


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
    @ApiNoContentResponse({ description: 'Friend deleted successfully' })
    @ApiBadRequestResponse({ description: 'Friend validation error' })
    public deleteFriendship(@Request() req: any, @Param('id', ParseIntPipe) id: number): Promise<void> {

        return this.meService.removeFriend(req.user as LoggedUserDto, id);
    }


    @Get('blockeds')
    @ApiOkResponse({ description: 'Blockeds retrieved successfully', type: [FriendModel] })
    public listBlockeds(@Request() req: any): Promise<BlockedModel[]> {

        return this.meService.listBlockeds(req.user as LoggedUserDto);
    }

    @Get('blockedby')
    @ApiOkResponse({ description: 'Blockeds by retrieved successfully', type: [FriendModel] })
    public listBlockedBy(@Request() req: any): Promise<BlockedModel[]> {

        return this.meService.listBlockedBy(req.user as LoggedUserDto);
    }

    @Post('frienblockedds/:id')
    @ApiCreatedResponse({ description: 'Blocked created successfully', type: BlockedModel })
    @ApiBadRequestResponse({ description: 'Blocked validation error' })
    public createBlocked(@Request() req: any, @Param('id', ParseIntPipe) id: number): Promise<BlockedModel> {

        return this.meService.addBlocked(req.user as LoggedUserDto, id);
    }

    @Delete('blocked/:id')
    @ApiNoContentResponse({ description: 'Blocked deleted successfully' })
    @ApiBadRequestResponse({ description: 'Blocked validation error' })
    public deleteBlocked(@Request() req: any, @Param('id', ParseIntPipe) id: number): Promise<void> {

        return this.meService.removeBlocked(req.user as LoggedUserDto, id);
    }


    @Get('chats/available')
    @ApiOkResponse({ description: 'Chats retrieved successfully', type: [ChatModel], isArray: true })
    public availableChannels(@Request() req: any): Promise<ChatModel[]> {

        return this.meService.listAvailableUserChats(req.user as LoggedUserDto);
    }

    @Get('chats/joined')
    @ApiOkResponse({ description: 'Chats retrieved successfully', type: [ChatModel], isArray: true })
    public myChannels(@Request() req: any): Promise<ChatModel[]> {

        return this.meService.listUserChats(req.user as LoggedUserDto);
    }

    @Get('chats/banned')
    @ApiOkResponse({ description: 'Chats retrieved successfully', type: [ChatModel], isArray: true })
    public bannedChannels(@Request() req: any): Promise<ChatModel[]> {

        return this.meService.listBannedUserChats(req.user as LoggedUserDto);
    }


    @Post('chats/join/:id')
    @ApiOkResponse({ description: 'Chat joined successfully', type: ChatParticipantModel })
    public joinChat(@Request() req: any, @Param('id', ParseIntPipe) id: number, @Body() joinInfos: JoinChatDto): Promise<ChatParticipantModel> {

        return this.meService.joinChat(req.user as LoggedUserDto, id, joinInfos);
    }

    // @Get('blockedby')
    // @ApiOkResponse({ description: 'Blockeds by retrieved successfully', type: [FriendModel] })
    // public listBlockedBy(@Request() req: any): Promise<BlockedModel[]> {

    //     return this.meService.listBlockedBy(req.user as LoggedUserDto);
    // }

    // @Post('frienblockedds/:id')
    // @ApiCreatedResponse({ description: 'Blocked created successfully', type: BlockedModel })
    // @ApiBadRequestResponse({ description: 'Blocked validation error' })
    // public createBlocked(@Request() req: any, @Param('id', ParseIntPipe) id: number): Promise<BlockedModel> {

    //     return this.meService.addBlocked(req.user as LoggedUserDto, id);
    // }

    // @Delete('blocked/:id')
    // @ApiNoContentResponse({ description: 'Blocked deleted successfully' })
    // @ApiBadRequestResponse({ description: 'Blocked validation error' })
    // public deleteBlocked(@Request() req: any, @Param('id', ParseIntPipe) id: number): Promise<void> {

    //     return this.meService.removeBlocked(req.user as LoggedUserDto, id);
    // }




    @Patch('update_pseudo')
    @AllowLogged()
    @ApiCreatedResponse({ description: 'Pseudo updated successfully', type: UpdatePseudoDto })
    @ApiNotFoundResponse({ description: 'User not found' })
    @ApiBadRequestResponse({ description: 'User validation error' })
    public update_pseudo(@Request() req: any, @Body() updatePseudo: UpdatePseudoDto): Promise<boolean> {

        return this.meService.updatePseudo(req.user as LoggedUserDto, updatePseudo.pseudo);
    }

    // // conserver au cas ou ca reste utile pour l api
    // @Get('avatar')
    // @AllowLogged()
    // @ApiCreatedResponse({ description: 'Avatar retrieved successfully', type: UserModel })
    // getFile(@Request() req: any, @Res({ passthrough: true }) res: Response): StreamableFile {

    //   const path = req.user.avatar_url;
    //   const extension: string = extname(path);

    //   res.set({'Content-Type': `image/${extension}`});

    //   const file = createReadStream(path, {encoding: "base64"});
    //   return new StreamableFile(file);
    // }

    @Put('upload_image')
    @AllowLogged()
    @UseInterceptors(
        FileInterceptor('avatar', {
            storage: diskStorage({
                destination: '../app-datas/avatars',
                filename: (req: any, file, cb) => {
                    cb(null, file.originalname);
                },
            }),
            limits: {
                fileSize: 1000000
            },
            fileFilter: imageFileFilter,
        }),
    )
    @ApiCreatedResponse({ description: 'Avatar updated successfully', type: UpdatePseudoDto })
    @ApiNotFoundResponse({ description: 'User not found' })
    @ApiBadRequestResponse({ description: 'User validation error' })
    public uploadFileAndPassValidation(@Request() req: any, @UploadedFile() file: Express.Multer.File): Promise<string> {

        return this.meService.updateAvatar(req.user as LoggedUserDto, file.originalname);
    }
}