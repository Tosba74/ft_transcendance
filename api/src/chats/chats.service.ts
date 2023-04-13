import { Injectable, NotFoundException, BadRequestException, forwardRef, Inject, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Server, Socket } from 'socket.io';

import { UsersService } from 'src/users/users.service';
import { MeService } from 'src/me/me.service';
import { ChatMessagesService } from 'src/chat_messages/chat_messages.service';
import { ChatParticipantsService } from 'src/chat_participants/chat_participants.service';

import { UpdateRoleDto } from 'src/chat_participants/dto/update-role'

import { ChatParticipantModel } from 'src/chat_participants/models/chat_participant.model';

import { ChatModel } from "./models/chat.model";
import { ChatTypeModel } from 'src/chat_types/models/chat_type.model';
import { ChatRoleModel } from 'src/chat_roles/models/chat_role.model';

import { UserDto } from 'src/_shared_dto/user.dto';
import { UserParticipantDto } from './dto/user-participant.dto';
import { LoggedUserDto } from 'src/auth/dto/logged_user.dto';
import { WsResponseDto } from 'src/_shared_dto/ws-response.dto';
import { ChatRoomDto } from 'src/_shared_dto/chat-room.dto';
import { ChatMessageDto } from 'src/_shared_dto/chat-message.dto';

import * as bcrypt from 'bcrypt';

interface WebsocketUser {
  socket: Socket;
  user: UserDto;
}

@Injectable()
export class ChatsService {

  constructor(
    @InjectRepository(ChatModel) private chatsRepository: Repository<ChatModel>,
    @Inject(forwardRef(() => MeService)) private meService: MeService,
    @Inject(forwardRef(() => ChatParticipantsService)) private chatParticipantsService: ChatParticipantsService,
    private chatMessagesService: ChatMessagesService,
    private usersService: UsersService,
  ) { }

  // clients = new Pair<Socket, LoggedUserDto>();
  clients: WebsocketUser[] = [];
  serverMsgId = 1;


  findAll(): Promise<ChatModel[]> {
    return this.chatsRepository.find();
  }

  async findOneById(id: number): Promise<ChatModel> {
    try {
      const chat = await this.chatsRepository.findOneOrFail({
        where: { id: id },
        relations: {
          type: true,
          participants: { participant: true, role: true },
          messages: { sender: true },
        }
      });
      return chat;
    }
    catch (error) {
      // throw new NotFoundException('Chat id not found');
      throw new NotFoundException('Chat id ' + id + ' not found');
    }
  }


  async findPublicChats(): Promise<ChatModel[]> {

    const publicChats = this.chatsRepository.find({
      select: { id: true, name: true, password: true, messages: true, participants: true, created_at: true, updated_at: true },
      where: {
        type: { id: ChatTypeModel.PUBLIC_TYPE },
      },
      relations: {
        type: true,
      }
    });

    return publicChats;
  }




  async create(name: string | undefined, type_id: number, password?: string): Promise<ChatModel> {

    const res = new ChatModel();

    if (name) {
      res.name = name;
    }
    else {
      res.name = 'Temp default name';
    }

    res.type = new ChatTypeModel(type_id);

    if (password) {
      const bcrypt = require('bcrypt');
      const saltRounds: number = 10;
      const hash: string = await bcrypt.hash(password, saltRounds);

      res.password = hash;
    } // See if better idea to authorize null on password
    else {
      res.password = '';
    }

    const created = await this.chatsRepository.save(res).catch((err: any) => {
      throw new BadRequestException('Chat creation error');
    });

    return created;
  }


  async getOrCreateConversation(user1_id: number, user2_id: number): Promise<ChatModel> {

    if (user1_id === user2_id) {
      throw new PreconditionFailedException('Same user for conversation is unauthorized');
    }


    // try {
    const discussions = await this.chatsRepository.find({
      where: {
        type: { id: ChatTypeModel.DISCUSSION_TYPE },
      },
      relations: { participants: { participant: true } },
    });

    const foundDiscussion = discussions.find(discussion => {
      return (
        discussion.participants.find(participant => { return participant.participant.id === user1_id }) !== undefined &&
        discussion.participants.find(participant => { return participant.participant.id === user2_id }) !== undefined);
    });

    if (foundDiscussion !== undefined) {
      return foundDiscussion;
    }


    return this.createConversation(user1_id, user2_id);
  }


  async createConversation(user1_id: number, user2_id: number): Promise<ChatModel> {

    if (user1_id === user2_id) {
      throw new PreconditionFailedException('Same user for conversation is unauthorized');
    }

    const user1 = await this.usersService.findOneById(user1_id);
    const user2 = await this.usersService.findOneById(user2_id);

    const createdDiscussion = await this.create(`${user1.pseudo} - ${user2.pseudo}`, ChatTypeModel.DISCUSSION_TYPE);


    this.chatParticipantsService.create(user1.id, createdDiscussion.id, ChatRoleModel.USER_ROLE);
    this.chatParticipantsService.create(user2.id, createdDiscussion.id, ChatRoleModel.USER_ROLE);

    return createdDiscussion;
  }

  async delete(id: number): Promise<void> {
    try {
      const chat = await this.findOneById(id);
      this.chatsRepository.delete(id);
    }
    catch (error) {
      throw new NotFoundException('Chat id not found');
    }
  }


  async identify(user: LoggedUserDto, client: Socket): Promise<WsResponseDto<undefined>> {

    if (!user || user.id == undefined) {
      return { error: 'Not logged', value: undefined };
    }

    if (this.isIdentifed(client) != undefined) {
      return { error: 'Already identified', value: undefined };
    }

    const foundUser = await this.usersService.findOneById(user.id, false) as UserDto;

    const newConn: WebsocketUser = {
      socket: client,
      user: foundUser,
    }

    this.clients.push(newConn);

    return { error: undefined, value: undefined };
  }


  async disconnect(client: Socket) {

    this.clients = this.clients.filter(value => {
      if (value.socket.id != client.id)
        return true;
    });
  }


  isIdentifed(client: Socket): UserDto | undefined {

    let found = this.clients.find(value => {
      if (value.socket.id == client.id) {
        return value.user;
      }
    });

    return found && found.user || undefined;
  }


  async connectRoom(server: Server, user: UserDto, client: Socket, room_id: number): Promise<WsResponseDto<ChatRoomDto>> {

    let res = new WsResponseDto<ChatRoomDto>();

    const room = await this.findOneById(room_id);

    // console.log('try to connect to room', room_id);
    // console.log(room);
    // console.log(room.participants);

    if (room.participants.some(element => {
      return element.participant.id === user.id && element.role.id != ChatRoleModel.BAN_ROLE
    })) {

      // Subscribe websocket to room
      client.join(room_id.toString());


      // Get all room informations from the db
      let newroom: ChatRoomDto = new ChatRoomDto();

      newroom.id = room_id;
      newroom.name = room.name.toString();
      newroom.type = room.type.id;

      //Get all messages from the db
      newroom.messages = [];

      room.messages.forEach(value => {
        let msg: ChatMessageDto = new ChatMessageDto();
        msg.id = value.id;
        msg.sender = value.sender.toUserDto();
        msg.content = value.message;

        newroom.messages.push(msg);

      });

      newroom.participants = [];

      room.participants.forEach(value => {
        let usr: UserParticipantDto = {
          ...value.participant.toUserDto(),
          roleId: value.role.id, roleName: value.role.name
        }

        newroom.participants.push(usr);

      });

      // console.log(newroom);
      res.value = newroom;
    }
    else {
      console.log('connect to unauthorized room');
      res.error = "Error: Unauthorized";
    }

    return (res);
  }


  async createMessage(user: UserDto, client: Socket, room_id: number, message: string): Promise<ChatMessageDto | undefined> {

    let responseMessage = new ChatMessageDto();

    const room = await this.findOneById(room_id);

    // Search if user is in the room and not banned
    let participant = room.participants.find(element => {
      return (
        element.participant.id === user.id &&
        element.role.id != ChatRoleModel.BAN_ROLE
      )
    });

    // Check if user in room has been found
    if (participant != undefined) {

      // Check if user is muted
      if (participant.muted_until < new Date()) {

        const msg = await this.chatMessagesService.create(message, user.id, room_id)

        responseMessage.id = msg.id;
        responseMessage.sender = { ...user, status: '' };
        responseMessage.content = message;

        return responseMessage;
      }
      else {
        responseMessage.id = -this.serverMsgId;
        responseMessage.sender = new UserDto();
        responseMessage.sender.id = -1;
        responseMessage.content = `You are muted until ${participant.muted_until.toUTCString()}`;
        this.serverMsgId++;

        client.emit('broadcastMessage', { room_id: room_id.toString(), message: responseMessage });
        return (undefined);
      }

    }
    else {
      responseMessage.id = -this.serverMsgId;;
      responseMessage.sender = new UserDto();
      responseMessage.sender.id = -1;
      responseMessage.content = 'Unauthorized';
      this.serverMsgId++;


      client.emit('broadcastMessage', { room_id: room_id.toString(), message: responseMessage });
      return (undefined);
    }

    // To be broadcasted in everyone in the room
    return (undefined);
  }


  async updateParticipants(server: Server, room_id: number) {

    const room = await this.findOneById(room_id);

    let participants: UserParticipantDto[] = [];

    room.participants.forEach(value => {
      let usr: UserParticipantDto = {
        ...value.participant.toUserDto(),
        roleId: value.role.id, roleName: value.role.name
      }

      participants.push(usr);
    });

    server.to(room_id.toString()).emit("updateParticipants", { room_id: room_id, participants: participants })
  }


  async adminCommand(server: Server, user: UserDto, client: Socket, room_id: number, message: string): Promise<ChatMessageDto | undefined> {

    let responseMessage = new ChatMessageDto();

    const room = await this.findOneById(room_id);

    // Search if user is in the room and is owner or admin
    if (room.participants.some(element => {
      return element.participant.id === user.id &&
        (element.role.id == ChatRoleModel.OWNER_ROLE || element.role.id == ChatRoleModel.ADMIN_ROLE)
    }) || message.startsWith("/gameinvite")) {

      let command = message.split(" ");
      function isNotBlank(elem: string) {
        return (elem !== '');
      }
      command = command.filter(isNotBlank);

      command[0] = command[0].toLocaleLowerCase()

      responseMessage.id = -this.serverMsgId;
      responseMessage.sender = new UserDto();
      responseMessage.sender.id = -1;
      this.serverMsgId++;

      console.log('admin command splitted:', command);

      switch (command[0]) {

        // Owner permission required
        case "/pw":
          responseMessage.content = await this.pwCommand(room, user, command);
          break;

        // minimum Admin permission required
        case "/invite":
          responseMessage.content = await this.inviteCommand(room, user, command);
          this.updateParticipants(server, room.id);
          break;
        case "/promote":
          responseMessage.content = await this.promoteCommand(room, user, command);
          this.updateParticipants(server, room.id);
          break;
        case "/demote":
          responseMessage.content = await this.demoteCommand(room, user, command);
          this.updateParticipants(server, room.id);
          break;
        case "/kick":
          responseMessage.content = await this.kickCommand(room, user, command);
          break;
        case "/ban":
          responseMessage.content = await this.banCommand(room, user, command);
          this.updateParticipants(server, room.id);
          break;
        case "/unban":
          responseMessage.content = await this.unbanCommand(room, user, command);
          this.updateParticipants(server, room.id);
          break;
        case "/role":
          responseMessage.content = await this.roleCommand(room, user, command);
          break;

        // special case
        case "/gameinvite":

          const gameInvite = await this.gameInvite(room, user, command);

          if (gameInvite === undefined) {
            responseMessage.content = 'Game invite error';
          } //
          else {
            return gameInvite;
          }

          break;

        default:
          responseMessage.content = 'Unknown command';

      }

      client.emit('broadcastMessage', { room_id: room_id, message: responseMessage });
      return (undefined);

    }
    else {
      responseMessage.id = -this.serverMsgId;
      responseMessage.sender = new UserDto();
      responseMessage.sender.id = -1;
      responseMessage.content = 'Unauthorized, you are not an admin';
      this.serverMsgId++;

      client.emit('broadcastMessage', { room_id: room_id, message: responseMessage });
      return (undefined);
    }

    // To be broadcasted in everyone in the room
    return (responseMessage);
  }


  async pwPermissions(room: ChatModel, userId: number): Promise<any> {
    if (room.type.name != 'public') {
      return 'pw: this is a private channel. Only public channel can have password.';
    }

    try {
      const senderRole = await this.chatParticipantsService.get_role(userId, room.id);
      if (senderRole !== ChatRoleModel.OWNER_ROLE)
        return 'pw: only the Owner can update the channel password';

    } catch (error) {
      return 'pw: error retrieving user role';
    }

    return true;
  }


  async isPasswordProtected(roomId: number): Promise<boolean> {
    const chat = await this.chatsRepository.findOneOrFail({
      select: ['password'],
      where: { id: roomId }
    });
    if (chat.password === '' || chat.password === undefined)
      return false
    return true;
  }


  async checkPassword(password: string, roomId: number): Promise<any> {
    try {
      const chat = await this.chatsRepository.findOneOrFail({
        select: ['password'],
        where: { id: roomId }
      });

      // if (chat.password === '' || chat.password === undefined)
      //   return true;

      if (await bcrypt.compare(password, chat.password) === false)
        return 'pw: wrong password';
      return true;

    } catch (error) {
      return 'pw: chat not found';
    }
  }


  async updatePassword(roomId: number, currentPw: string | undefined = undefined, newPw: string | undefined = undefined): Promise<string> {
    try {
      var chat = await this.chatsRepository.findOneOrFail({
        where: { id: roomId }
      });
    } catch (error) {
      throw new NotFoundException('Chat id not found');
    }

    // check current password
    if (currentPw) {
      const check = await this.checkPassword(currentPw, roomId);
      if (check !== true)
        return check;
    }

    // update new password
    if (newPw !== undefined && newPw !== '') {
      const bcrypt = require('bcrypt');
      const saltRounds: number = 10;
      const hash: string = await bcrypt.hash(newPw, saltRounds);
      chat.password = hash;
    }
    // remove current password
    else if (newPw === '') {
      chat.password = '';
    }

    await this.chatsRepository.save(chat).catch(() => {
      throw new BadRequestException('Chat password update error');
    });

    if (currentPw === undefined && newPw === '')
      return 'pw: password removed';
    else if (currentPw === undefined && newPw !== undefined)
      return 'pw: password added';
    else if (currentPw !== undefined && newPw !== undefined)
      return 'pw: password updated';
    return 'pw: unexpected error in password update process'
  }


  async pwCommand(room: ChatModel, user: UserDto, command: string[]): Promise<string> {
    const errorMsg = await this.pwPermissions(room, user.id);

    if (errorMsg !== true)
      return errorMsg;

    if (command.length < 1 || command.length > 3)
      return 'changepw: argument error';

    try {
      var isProtected: boolean = await this.isPasswordProtected(room.id);
    } catch (error) {
      return 'pw: chat not found';
    }

    // "/pw": 1 arg = remove pw
    if (command.length === 1) {
      if (isProtected === false)
        return 'pw: no effect, this channel doesn\'t have any password.';
      else
        return 'pw: this channel does have a password, use: "/pw <password>" to remove it.';
    }
    // "/pw currentpw": 2 args = add pw OR "/pw newpw": 2 args = add pw
    else if (command.length === 2) {
      const check = await this.checkPassword(command[1], room.id);

      // si l'arg 2 correspond au current password, dans ce cas intention = remove
      if (check === true)
        return await this.updatePassword(room.id, undefined, '');

      // sinon, si l'arg 2 correspond pas au current password, intention = add
      else if (check !== true && isProtected === false)
        return await this.updatePassword(room.id, undefined, command[1]);
      else if (check !== true && isProtected === true)
        return check;
      return 'pw: unexpected error in password update process'
    }
    // "/pw currentpw newpw": 3 args = update pw
    else {
      if (isProtected === false)
        return 'pw: this channel doesn\'t have any password, use: "/pw <password>" to add one';
      else
        return this.updatePassword(room.id, command[1], command[2]); // update
    }
  }


  // sender is the admin who typed the cmd, receiver is the user targeted by the cmd
  async roleCommandsPermission(room: ChatModel, command: string[], senderId: number, receiverId: number, roleToAssign = -1): Promise<string | undefined> {
    const cmdName = command[0].substring(1);

    if (command.length != 2)
      return `${cmdName}: argument error`;

    if (receiverId == senderId)
      return `${cmdName}: cannot ${cmdName} yourself`;

    try {
      const receiverRole = await this.chatParticipantsService.get_role(receiverId, room.id);

      if (roleToAssign != -1 && receiverRole === roleToAssign) {

        let message = '';
        switch (cmdName) {
          case "promote":
            message = `promote: no effect, ${receiverId} is already admin`;
            break;
          case "demote":
            message = `demote: no effect, ${receiverId} has no special permission`;
            break;
          case "ban":
            message = `ban: no effect, ${receiverId} already banned`;
            break;
          case "unban":
            message = `unban: no effect, ${receiverId} already in the channel`;
            break;
        }
        return message;
      }
      // admin can't touch admin
      else if (receiverRole === ChatRoleModel.ADMIN_ROLE) {
        const senderRole = await this.chatParticipantsService.get_role(senderId, room.id);
        if (senderRole !== ChatRoleModel.OWNER_ROLE)
          return `${cmdName}: impossible, ${receiverId} is also Admin, refer to the Owner`;
      }
    } catch (error) {
      return `${cmdName}: ${receiverId} not found or no relation with this channel`;
    }

    // nobody can touch the owner
    if (room.participants.find(value => (value.participant.id == receiverId && value.role.id == ChatRoleModel.OWNER_ROLE)))
      return `${cmdName}: impossible, ${receiverId} is the owner of this channel`;

    return undefined;
  }


  async inviteCommand(room: ChatModel, user: UserDto, command: string[]): Promise<string> {
    if (command.length != 2)
      return 'invite: argument error';

    if (room.type.name != 'private') {
      return 'invite: this is a public channel, only private channel accept invitations';
    }

    let userToInvite = parseInt(command[1]);

    const found = room.participants.find(value => (value.participant.id == userToInvite))
    if (found) {
      if (found.role.id == ChatRoleModel.BAN_ROLE)
        return `invite: ${userToInvite} is banned of this channel`;
      if (userToInvite == user.id)
        return 'invite: you\'re already in this channel';
      return `invite: ${userToInvite} is already in this channel`;
    }

    try {
      await this.chatParticipantsService.create(userToInvite, room.id, ChatRoleModel.USER_ROLE);
    } catch (error) {
      return 'invite: user not found';
    }
    return 'invite: done';
  }


  async promoteCommand(room: ChatModel, user: UserDto, command: string[]): Promise<string> {

    let userToPromote = parseInt(command[1]);

    const permission = await this.roleCommandsPermission(room, command, user.id, userToPromote, ChatRoleModel.ADMIN_ROLE);
    if (permission !== undefined)
      return permission

    let newRole = new UpdateRoleDto();
    newRole.new_role = ChatRoleModel.ADMIN_ROLE;
    newRole.participantId = userToPromote;
    newRole.roomId = room.id;
    try {
      await this.chatParticipantsService.update_role(newRole);
    } catch (error) {
      return "promote: user not found or not in this channel";
    }

    let clientsToPromote = this.clients.filter(value => {
      return value.user.id == userToPromote
    });
    if (clientsToPromote.length > 0) {

      let promoteMessage = new ChatMessageDto();
      promoteMessage.id = -this.serverMsgId;
      promoteMessage.sender = new UserDto();
      promoteMessage.sender.id = -1;
      promoteMessage.content = user.pseudo + ' named you admin of this channel';
      this.serverMsgId++;

      clientsToPromote.forEach(value => {
        if (value.socket.rooms.has(room.id.toString())) {
          value.socket.emit('broadcastMessage', { room_id: room.id, message: promoteMessage });
        }
      });
    }
    return "promote: done";
  }


  async demoteCommand(room: ChatModel, user: UserDto, command: string[]): Promise<string> {

    let userToDemote = parseInt(command[1]);

    const permission = await this.roleCommandsPermission(room, command, user.id, userToDemote, ChatRoleModel.USER_ROLE);
    if (permission !== undefined)
      return permission

    let newRole = new UpdateRoleDto();
    newRole.new_role = ChatRoleModel.USER_ROLE;
    newRole.participantId = userToDemote;
    newRole.roomId = room.id;
    try {
      await this.chatParticipantsService.update_role(newRole);
    } catch (error) {
      return "demote: user not found or not in this channel";
    }

    let clientsToDemote = this.clients.filter(value => {
      return value.user.id == userToDemote
    });
    if (clientsToDemote.length > 0) {

      let demoteMessage = new ChatMessageDto();
      demoteMessage.id = -this.serverMsgId;
      demoteMessage.sender = new UserDto();
      demoteMessage.sender.id = -1;
      demoteMessage.content = user.pseudo + ' removed your Admin status';
      this.serverMsgId++;

      clientsToDemote.forEach(value => {
        if (value.socket.rooms.has(room.id.toString())) {
          value.socket.emit('broadcastMessage', { room_id: room.id, message: demoteMessage });
        }
      });
    }
    return "demote: done";
  }


  async kickCommand(room: ChatModel, user: UserDto, command: string[]): Promise<string> {

    let userToKick = parseInt(command[1]);

    const permission = await this.roleCommandsPermission(room, command, user.id, userToKick);
    if (permission !== undefined)
      return permission

    // User could have multiple clients connected, get'em all
    let clientsToKick = this.clients.filter(value => {
      return value.user.id == userToKick
    });

    if (clientsToKick.length > 0) {
      let kickMessage = new ChatMessageDto();
      kickMessage.id = -this.serverMsgId;
      kickMessage.sender = new UserDto();
      kickMessage.sender.id = -1;
      kickMessage.content = 'You have been kicked';
      this.serverMsgId++;

      clientsToKick.forEach(value => {
        if (value.socket.rooms.has(room.id.toString())) {

          value.socket.emit('broadcastMessage', { room_id: room.id, message: kickMessage });
          value.socket.leave(room.id.toString());
        }
      });

      return "kick: done";
    }
    else {
      return "kick: user not found or connected";
    }
  }


  async banCommand(room: ChatModel, user: UserDto, command: string[]): Promise<string> {

    let userToBan = parseInt(command[1]);

    const permission = await this.roleCommandsPermission(room, command, user.id, userToBan, ChatRoleModel.BAN_ROLE);
    if (permission !== undefined)
      return permission

    let clientsToBan = this.clients.filter(value => {
      return value.user.id == userToBan
    });

    if (clientsToBan.length > 0) {
      let banMessage = new ChatMessageDto();
      banMessage.id = -this.serverMsgId;
      banMessage.sender = new UserDto();
      banMessage.sender.id = -1;
      banMessage.content = 'You have been banned';
      this.serverMsgId++;

      clientsToBan.forEach(value => {
        if (value.socket.rooms.has(room.id.toString())) {

          value.socket.emit('broadcastMessage', { room_id: room.id, message: banMessage });
          value.socket.leave(room.id.toString());
        }
      });
    }

    let newRole = new UpdateRoleDto();
    newRole.new_role = ChatRoleModel.BAN_ROLE;
    newRole.participantId = userToBan;
    newRole.roomId = room.id;
    try {
      await this.chatParticipantsService.update_role(newRole);
    } catch (error) {
      return "ban: user not found or not in this channel";
    }
    return "ban: done";
  }


  async unbanCommand(room: ChatModel, user: UserDto, command: string[]): Promise<string> {

    let userToUnban = parseInt(command[1]);

    const permission = await this.roleCommandsPermission(room, command, user.id, userToUnban, ChatRoleModel.USER_ROLE);
    if (permission !== undefined)
      return permission

    let newRole = new UpdateRoleDto();
    newRole.new_role = ChatRoleModel.USER_ROLE;
    newRole.participantId = userToUnban;
    newRole.roomId = room.id;
    try {
      await this.chatParticipantsService.update_role(newRole);
    } catch (error) {
      return "uban: user not found or not in this channel";
    }
    return "uban: done";
  }


  async roleCommand(room: ChatModel, user: UserDto, command: string[]): Promise<string> {
    if (command.length == 1)
      var targetUser = user.id;
    else if (command.length == 2) {
      console.log(parseInt(command[1]));
      var targetUser = parseInt(command[1]);
    }
    else
      return 'role: argument error';

    try {
      let role: number | string = await this.chatParticipantsService.get_role(targetUser, room.id);
      switch (role) {
        case 1:
          role = 'user';
          break
        case 2:
          role = 'admin';
          break
        case 3:
          role = 'owner';
          break
        case 4:
          role = 'banned';
          break
      }
      return `role: ${role}`
    } catch (error) {
      return `role: ${targetUser} not found or no relation with this channel`;
    }
  }


  async gameInvite(room: ChatModel, user: UserDto, command: string[]): Promise<ChatMessageDto | undefined> {
    if (command.length !== 3) {
      return undefined;
    }

    var targetUser = parseInt(command[1]);
    var targetGame = parseInt(command[2]);

    let invite = new ChatMessageDto();
    invite.id = -this.serverMsgId;
    invite.sender = user;

    invite.invite_id = targetUser;
    invite.invite_pseudo = (await this.usersService.findOneById(targetUser)).pseudo;
    invite.invite_game_id = targetGame;
    
    invite.content = '';
    this.serverMsgId++;

    return invite;
  }
}
