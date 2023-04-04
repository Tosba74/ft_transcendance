import { ConsoleLogger, Injectable, NotFoundException, BadRequestException, PreconditionFailedException, UnauthorizedException, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { LoggedUserDto } from 'src/auth/dto/logged_user.dto';

import { UserModel } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';

import { FriendsService } from 'src/friends/friends.service';
import { FriendModel } from 'src/friends/models/friend.model';

import { BlockedModel } from 'src/blockeds/models/blocked.model';
import { BlockedsService } from 'src/blockeds/blockeds.service';

import { ChatParticipantsService } from 'src/chat_participants/chat_participants.service';
import { ChatParticipantModel } from 'src/chat_participants/models/chat_participant.model';

import { ChatsService } from 'src/chats/chats.service';
import { ChatModel } from 'src/chats/models/chat.model';

import { ChatRoleModel } from 'src/chat_roles/models/chat_role.model';
import { ChatTypeModel } from 'src/chat_types/models/chat_type.model';

import { JoinChatDto } from './dto/join_chat';
import { UserDto } from 'src/_shared_dto/user.dto';

@Injectable()
export class MeService {
  constructor(
    private usersService: UsersService,
    private friendsService: FriendsService,
    private blockedsService: BlockedsService,
    @Inject(forwardRef(() => ChatsService))
    private chatsService: ChatsService,
    private chatParticipantService: ChatParticipantsService,
  ) { }

  async listFriends(user: LoggedUserDto): Promise<UserDto[]> {

    return this.friendsService.findFriends(user.id);
  }

  async listReceivedFriends(user: LoggedUserDto): Promise<UserDto[]> {

    return this.friendsService.listReceivedFriends(user.id);
  }

  async listSentFriends(user: LoggedUserDto): Promise<UserDto[]> {

    return this.friendsService.listSentFriends(user.id);
  }



  async addFriend(user: LoggedUserDto, friend_id: number): Promise<FriendModel> {

    return this.friendsService.createFriendship(user.id, friend_id);
  }

  async addFriendBySlug(user: LoggedUserDto, slug: string): Promise<FriendModel> {

    const foundUser = await this.usersService.findOneByPseudo(slug);

    return this.friendsService.createFriendship(user.id, foundUser.id);
  }

  async removeFriend(user: LoggedUserDto, friend_id: number): Promise<void> {

    return this.friendsService.deleteFriendship(user.id, friend_id);
  }


  async updatePseudo(user: LoggedUserDto, pseudo: string): Promise<boolean> {

    return this.usersService.updatePseudo(user.id, pseudo);
  }

  async updateAvatar(user: LoggedUserDto, filename: string): Promise<string> {

    return this.usersService.updateAvatar(user.id, filename);
  }



  async listBlockedBy(user: LoggedUserDto): Promise<UserDto[]> {

    return this.blockedsService.blockedBy(user.id);
  }

  async listBlockeds(user: LoggedUserDto): Promise<UserDto[]> {

    return this.blockedsService.blockedUsers(user.id);
  }

  async addBlocked(user: LoggedUserDto, blocked_id: number): Promise<BlockedModel> {

    return this.blockedsService.blockUser(user.id, blocked_id);
  }

  async removeBlocked(user: LoggedUserDto, blocked_id: number): Promise<void> {

    return this.blockedsService.unblockUser(user.id, blocked_id);
  }


  async listChats(user: LoggedUserDto): Promise<ChatParticipantModel[]> {

    return this.chatParticipantService.listChats(user.id);
  }


  async joinChat(user: LoggedUserDto, chat_id: number, joinInfos: JoinChatDto): Promise<ChatParticipantModel> {

    const chat = await this.chatsService.findOneById(chat_id);

    if (chat.type.id != ChatTypeModel.PUBLIC_TYPE) {

      throw new UnauthorizedException('Room not public type');
    }


    if (chat.participants.some(element => { 
      return element.participant.id === user.id && element.role.id === ChatRoleModel.BAN_ROLE
    })) {

      throw new PreconditionFailedException('Banned from this room');
    }

    else if (chat.participants.some(element => { 
      return element.participant.id === user.id 
    })) {

      throw new PreconditionFailedException('Already member of the room');
    }


    if (chat.password != undefined && joinInfos.password != undefined && await bcrypt.compare(joinInfos.password, chat.password)) {

      throw new UnauthorizedException('Missing password or password wrong');
    }


    return this.chatParticipantService.create(user.id, chat_id, ChatRoleModel.USER_ROLE);
  }
}