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
import { CreateChatDto } from 'src/chats/dto/create-chat.dto';

import { ChannelDto } from 'src/_shared_dto/channel.dto';
import { UserDto } from 'src/_shared_dto/user.dto';



@Controller('api/me')
@ApiTags('api/me')
@AllowLogged()
@UseFilters(HttpExceptionFilter)
export class MeController {
    constructor(private meService: MeService) { }

    @Get()
    @ApiOkResponse({ description: 'User infos retrieved successfully', type: LoggedUserDto })
    async getMe(@Request() req: any): Promise<LoggedUserDto> {

        const user = req.user as LoggedUserDto;


        user.asked = (await this.meService.listSentFriends(user)).map(value => value.id);
        user.friends = (await this.meService.listFriends(user)).map(value => value.id);
        user.blockeds = (await this.meService.listBlockeds(user)).map(value => value.id);

        return user;
    }

    // @Get()
    // public findAll(): Promise<FriendModel[]> {
    //     return this.friendsService.findAll();
    // }


    @Get('friends')
    @ApiOkResponse({ description: 'Friends retrieved successfully', type: [UserDto] })
    public listFriendships(@Request() req: any): Promise<UserDto[]> {

        return this.meService.listFriends(req.user as LoggedUserDto);
    }

    @Get('friends/received')
    @ApiOkResponse({ description: 'Friends retrieved successfully', type: [UserDto] })
    public listReceivedFriendships(@Request() req: any): Promise<UserDto[]> {

        return this.meService.listReceivedFriends(req.user as LoggedUserDto);
    }

    @Get('friends/sent')
    @ApiOkResponse({ description: 'Friends retrieved successfully', type: [UserDto] })
    public listSentFriendships(@Request() req: any): Promise<UserDto[]> {

        return this.meService.listSentFriends(req.user as LoggedUserDto);
    }

    @Post('friends/:id')
    @ApiCreatedResponse({ description: 'Friend created successfully', type: FriendModel })
    @ApiBadRequestResponse({ description: 'Friend validation error' })
    public createFriendship(@Request() req: any, @Param('id', ParseIntPipe) id: number): Promise<FriendModel> {

        return this.meService.addFriend(req.user as LoggedUserDto, id);
    }

    @Post('friends/slug/:slug')
    @ApiCreatedResponse({ description: 'Friend created successfully', type: FriendModel })
    @ApiBadRequestResponse({ description: 'Friend validation error' })
    public createFriendshipBySlug(@Request() req: any, @Param('slug') slug: string): Promise<FriendModel> {

        return this.meService.addFriendBySlug(req.user as LoggedUserDto, slug);
    }

    @Delete('friends/:id')
    @HttpCode(204)
    @ApiNoContentResponse({ description: 'Friend deleted successfully' })
    @ApiBadRequestResponse({ description: 'Friend validation error' })
    public deleteFriendship(@Request() req: any, @Param('id', ParseIntPipe) id: number): Promise<void> {

        return this.meService.removeFriend(req.user as LoggedUserDto, id);
    }


    @Get('blockeds')
    @ApiOkResponse({ description: 'Blockeds retrieved successfully', type: [UserDto] })
    public listBlockeds(@Request() req: any): Promise<UserDto[]> {

        return this.meService.listBlockeds(req.user as LoggedUserDto);
    }

    @Get('blockedby')
    @ApiOkResponse({ description: 'Blockeds by retrieved successfully', type: [UserDto] })
    public listBlockedBy(@Request() req: any): Promise<UserDto[]> {

        return this.meService.listBlockedBy(req.user as LoggedUserDto);
    }

    @Post('blockeds/:id')
    @ApiCreatedResponse({ description: 'Blocked created successfully', type: BlockedModel })
    @ApiBadRequestResponse({ description: 'Blocked validation error' })
    public createBlocked(@Request() req: any, @Param('id', ParseIntPipe) id: number): Promise<BlockedModel> {

        return this.meService.addBlocked(req.user as LoggedUserDto, id);
    }

    @Delete('blockeds/:id')
    @HttpCode(204)
    @ApiNoContentResponse({ description: 'Blocked deleted successfully' })
    @ApiBadRequestResponse({ description: 'Blocked validation error' })
    public deleteBlocked(@Request() req: any, @Param('id', ParseIntPipe) id: number): Promise<void> {

        return this.meService.removeBlocked(req.user as LoggedUserDto, id);
    }


    @Get('chats/available')
    @ApiOkResponse({ description: 'Chats retrieved successfully', type: [ChannelDto], isArray: true })
    public availableChannels(@Request() req: any): Promise<ChannelDto[]> {

        return this.meService.listAvailableUserChats(req.user as LoggedUserDto);
    }

    @Get('chats/joined')
    @ApiOkResponse({ description: 'Chats retrieved successfully', type: [ChannelDto], isArray: true })
    public myChannels(@Request() req: any): Promise<ChannelDto[]> {

        return this.meService.listUserChats(req.user as LoggedUserDto);
    }

    @Get('chats/banned')
    @ApiOkResponse({ description: 'Chats retrieved successfully', type: [ChannelDto], isArray: true })
    public bannedChannels(@Request() req: any): Promise<ChannelDto[]> {

        return this.meService.listBannedUserChats(req.user as LoggedUserDto);
    }


    @Get('chats/conversation/:id')
    @ApiOkResponse({ description: 'Chat found successfully', type: ChatModel })
    public getOrCreateConversation(@Request() req: any, @Param('id', ParseIntPipe) id: number): Promise<ChannelDto> {

        return this.meService.getOrCreateConversation(req.user as LoggedUserDto, id);
    }

    @Post('chats/create')
    @ApiOkResponse({ description: 'Chat created successfully', type: ChatModel })
    public createChat(@Request() req: any, @Body() createInfos: CreateChatDto): Promise<ChatModel> {

        return this.meService.createChat(req.user as LoggedUserDto, createInfos);
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