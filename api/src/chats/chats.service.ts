import { Injectable, NotFoundException, BadRequestException, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Socket } from 'socket.io';

import { MeService } from 'src/me/me.service';
import { ChatMessagesService } from 'src/chat_messages/chat_messages.service';

import { ChatParticipantsService } from 'src/chat_participants/chat_participants.service';
import { UpdateRoleDto } from 'src/chat_participants/dto/update-role'

import { ChatParticipantModel } from 'src/chat_participants/models/chat_participant.model';

import { ChatModel } from "./models/chat.model";
import { ChatTypeModel } from 'src/chat_types/models/chat_type.model';
import { ChatRoleModel } from 'src/chat_roles/models/chat_role.model';

import { LoggedUserDto } from 'src/auth/dto/logged_user.dto';

import { UserDto } from 'src/_shared_dto/user.dto';
import { ChatResponseDto } from 'src/_shared_dto/chat-response.dto';
import { ChatRoomDto } from 'src/_shared_dto/chat-room.dto';
import { ChatMessageDto } from 'src/_shared_dto/chat-message.dto';
import { UsersService } from 'src/users/users.service';

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
    private chatMessagesService: ChatMessagesService,
    private chatParticipantsService: ChatParticipantsService,
    private usersService: UsersService,
  ) { }

  // clients = new Pair<Socket, LoggedUserDto>();
  clients: WebsocketUser[] = [];
  serverMsgId = 1;


/* 
  --------- USUAL CHAT ACTIONS  ---------
*/

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
    }

    const created = await this.chatsRepository.save(res).catch((err: any) => {
      throw new BadRequestException('Chat creation error');
    });

    return created;

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

  async updatePassword(id: number, password: string): Promise<void> {
    try {
      var chat = await this.chatsRepository.findOneOrFail({
        where: { id: id }
      });
    } catch (error) {
      throw new NotFoundException('Chat id not found');
    }

    if (password !== "" && password !== undefined) {
      const bcrypt = require('bcrypt');
      const saltRounds: number = 10;
      const hash: string = await bcrypt.hash(password, saltRounds);
      chat.password = hash;
    }
    else {
      // for /removepw
      chat.password = "";
    }

    await this.chatsRepository.save(chat).catch(() => {
      throw new BadRequestException('Chat password update error');
    });
  }


  async identify(user: LoggedUserDto, client: Socket): Promise<ChatResponseDto<undefined>> {

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


  async idList() {
    // this.clients.forEach((value) => {

    //   console.log('list item', value.socket.id, value.user.id);

    // });
    // console.log('list end');
  }


  isIdentifed(client: Socket): UserDto | undefined {

    let found = this.clients.find(value => {
      if (value.socket.id == client.id) {
        return value.user;
      }
    });

    return found && found.user || undefined;
  }


  async connectRoom(user: UserDto, client: Socket, room_id: number): Promise<ChatResponseDto<ChatRoomDto>> {
    
    let res = new ChatResponseDto<ChatRoomDto>();
    
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
        let usr: UserDto = value.participant.toUserDto();

        newroom.participants.push(usr);

      });

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



/* 
  --------- ADMIN/OWNER COMMANDS  ---------
*/

  async adminCommand(user: UserDto, client: Socket, room_id: number, message: string): Promise<ChatMessageDto | undefined> {

    let responseMessage = new ChatMessageDto();

    const room = await this.findOneById(room_id);

    // Search if user is in the room and is owner or admin
    if (room.participants.some(element => {
      return element.participant.id === user.id &&
        (element.role.id == ChatRoleModel.OWNER_ROLE || element.role.id == ChatRoleModel.ADMIN_ROLE)
    })) {

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
        case "/addpw":
          responseMessage.content = await this.addpwCommand(room, user, command);
          break;
        case "/changepw":
          responseMessage.content = await this.changepwCommand(room, user, command);
          break;
        case "/removepw":
          responseMessage.content = await this.removepwCommand(room, user, command);
          break;

        // minimum Admin permission required
        case "/invite":
          responseMessage.content = await this.inviteCommand(room, user, command);
          break;
        case "/promote":
          responseMessage.content = await this.promoteCommand(room, user, command);
          break;
        case "/demote":
          responseMessage.content = await this.demoteCommand(room, user, command);
          break;
        case "/kick":
          responseMessage.content = await this.kickCommand(room, user, command);
          break;
        case "/ban":
          responseMessage.content = await this.banCommand(room, user, command);
          break;
        case "/unban":
          responseMessage.content = await this.unbanCommand(room, user, command);
          break;
        case "/role":
          responseMessage.content = await this.roleCommand(room, user, command);
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


  /* 
    OWNER PERMISSION COMMANDS:
  */

  async pwCommandsPermissions(room: ChatModel, userId: number, command: string): Promise<any> {
    if (room.type.name != 'public') {
      return `${command}: this is a private channel. Only public channel can have password.`;
    }

    try {
      const senderRole = await this.chatParticipantsService.get_role(userId, room.id);
      if (senderRole !== ChatRoleModel.OWNER_ROLE)
        return `${command}: only the Owner can update the channel password`;
    
    } catch (error) {
      return `${command}: error retrieving user role`;
    }

    return true;
  }


  async isPasswordProtected(roomId:number): Promise<boolean> {
    const chat = await this.chatsRepository.findOneOrFail({
      select: ['password'], 
      where: { id: roomId }
    });
    if (chat.password === '' || chat.password === undefined)
      return false
    return true;
  }


  async checkPassword(password:string, roomId: number, command: string): Promise<any> {
    try {
      const chat = await this.chatsRepository.findOneOrFail({
        select: ['password'], 
        where: { id: roomId }
      });

      if (chat.password === '' || chat.password === undefined)
        return true;

      if (await bcrypt.compare(password, chat.password) === false)
        return `${command}: wrong password`;

      return true;
    } catch (error) {
      return `${command}: chat not found`;
    }
  }


  // '/addpw newpw'
  async addpwCommand(room: ChatModel, user: UserDto, command: string[]): Promise<string> {
    const errorMsg = await this.pwCommandsPermissions(room, user.id, command[0]);
    if (errorMsg !== true)
      return errorMsg;
  
    if (command.length != 2)
      return 'addpw: argument error';

    // check if protected
    try {
      if (await this.isPasswordProtected(room.id) === true)
        return 'addpw: this channel does have a password. In order to modify the actual password use: \'changepw pw newpw\'';
    } catch (error) {
      return 'addpw: chat not found';
    }

    // update
    const newpw = command[1];
    try {
      await this.updatePassword(room.id, newpw);
    } catch (error) {
      return 'addpw: error';
    }

    return 'addpw: done';
  }


  // '/changepw newpw' or '/changepw pw newpw'
  async changepwCommand(room: ChatModel, user: UserDto, command: string[]): Promise<string> {
    const errorMsg = await this.pwCommandsPermissions(room, user.id, command[0]);
    if (errorMsg !== true)
      return errorMsg;
  
    if (command.length != 2 && command.length != 3)
      return 'changepw: argument error';

    // check arguments length compare to the password state
    try {
      if (await this.isPasswordProtected(room.id) === false && command.length == 3)
        return 'changepw: this channel doesn\'t have any password. In order to add one use: \'addpw pw\' or \'changepw pw\'';
      else if (await this.isPasswordProtected(room.id) === true && command.length == 2)
        return 'changepw: this channel does have a password. In order to modify the actual password use: \'changepw pw newpw\'';
    } catch (error) {
      return 'changepw: chat not found';
    }
    
    // parse + (checkpassword)
    if (command.length === 2) {
      var newpw = command[1];
    }
    else {
      const currentpw = command[1];
      const check = await this.checkPassword(currentpw, room.id, command[0]);
      if (check !== true)
        return check;

      var newpw = command[2];
    }
      
    // update
    try {
      await this.updatePassword(room.id, newpw);
    } catch (error) { 
      return 'changepw: error';
    }

    return 'changepw: done';
  }
  

  // '/removepw pw'
  async removepwCommand(room: ChatModel, user: UserDto, command: string[]): Promise<string> {
    const errorMsg = await this.pwCommandsPermissions(room, user.id, command[0]);
    if (errorMsg !== true)
      return errorMsg;

    if (command.length != 2)
      return 'removepw: argument error';

    try {
      if (await this.isPasswordProtected(room.id) === false)
        return 'removepw: this channel doesn\'t have any password.';
    } catch (error) {
      return 'removepw: chat not found';
    }
    
    // checkpassword
    const currentpw = command[1];
    const check = await this.checkPassword(currentpw, room.id, command[0]);
    if (check !== true)
      return check;

    // update
    try {
      await this.updatePassword(room.id, '');
    } catch (error) { 
      return 'removepw: error';
    }

    return 'removepw: done';
  }


  /* 
    ADMIN PERMISSION COMMANDS:
  */

  // sender is the admin who typed the cmd, receiver is the user targeted by the cmd
  async roleCommandsPermission(room:ChatModel, command: string[], senderId: number, receiverId: number, roleToAssign=-1): Promise<string | undefined> {
    const cmdName = command[0].substring(1);
    
    if (command.length != 2)
      return `${cmdName}: argument error`;

    // not to yourself
    if (receiverId == senderId)
      return `${cmdName}: cannot ${cmdName} yourself`;

    try {
      const receiverRole = await this.chatParticipantsService.get_role(receiverId, room.id);

      // already the targeted role (kick has no role to assign so does not enter this condition)
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
      // admin cant touch admin
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


  // users need a quit command 
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

    // update role in db
    let newRole = new UpdateRoleDto();
    newRole.new_role = ChatRoleModel.ADMIN_ROLE;
    newRole.participantId = userToPromote;
    newRole.roomId = room.id;
    try {
      await this.chatParticipantsService.update_role(newRole);
    } catch (error) {
      return "promote: user not found or not in this channel";
    }

    // Notify the sender (and the promoted user if ((multi)connected)
    let clientsToPromote = this.clients.filter(value => {
      return value.user.id == userToPromote
    });
    if (clientsToPromote.length > 0) {

      let promoteMessage = new ChatMessageDto();
      promoteMessage.id = -this.serverMsgId;
      promoteMessage.sender = { ...user, status: '' };
      // promoteMessage.sender = new UserDto();
      promoteMessage.sender.id = -1;
      promoteMessage.content = promoteMessage.sender.pseudo + ' named you Admin of this channel';
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
    
    // update role in db
    let newRole = new UpdateRoleDto();
    newRole.new_role = ChatRoleModel.USER_ROLE;
    newRole.participantId = userToDemote;
    newRole.roomId = room.id;
    try {
      await this.chatParticipantsService.update_role(newRole);
    } catch (error) {
      return "demote: user not found or not in this channel";
    }
    
    // Notify the sender (and the demoted user if ((multi)connected)
    let clientsToDemote = this.clients.filter(value => {
      return value.user.id == userToDemote
    });
    if (clientsToDemote.length > 0) {

      let demoteMessage = new ChatMessageDto();
      demoteMessage.id = -this.serverMsgId;
      demoteMessage.sender = { ...user, status: '' };
      // demoteMessage.sender = new UserDto();
      demoteMessage.sender.id = -1;
      demoteMessage.content = demoteMessage.sender.pseudo + ' removed your Admin status';
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

      // Create kick message
      let kickMessage = new ChatMessageDto();
      kickMessage.id = -this.serverMsgId;
      kickMessage.sender = { ...user, status: '' };      // NEST ERROR: sender was undefined here so cant set his id
      // kickMessage.sender = new UserDto();             // either the admin user either -1 ?
      kickMessage.sender.id = -1;
      kickMessage.content = 'You have been kicked';
      this.serverMsgId++;

      // Send kick message to all clients connected to the room and disconnect them
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

    // User could have multiple clients connected, get'em all
    let clientsToBan = this.clients.filter(value => {
      return value.user.id == userToBan
    });

    // 1. (KICK) + NOTIFY
    if (clientsToBan.length > 0) {// if active connexions
      // kick him from channel with message

      // Create kick message
      let banMessage = new ChatMessageDto();
      banMessage.id = -this.serverMsgId;
      banMessage.sender = { ...user, status: '' };
      // banMessage.sender = new UserDto();
      banMessage.sender.id = -1;
      banMessage.content = 'You have been banned';
      this.serverMsgId++;

      // Send kick message to all clients connected to the room and disconnect them
      clientsToBan.forEach(value => {
        if (value.socket.rooms.has(room.id.toString())) {

          value.socket.emit('broadcastMessage', { room_id: room.id, message: banMessage });
          value.socket.leave(room.id.toString());
        }
      });
    }
    else {// no active connexions
      // mettre une notif cote front ???
      console.log('banned without active connection');
    }

    // 2. CHAT_PARTICIPANTS: USER-ROOM SET ROLE TO BAN
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
    else if (command.length == 2)
      var targetUser = parseInt(command[1]);
    else
      return 'role: argument error';
    
    try {
      let role: number | string = await this.chatParticipantsService.get_role(targetUser, room.id);
      switch(role) {
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
      return "role: user not found or not in this channel";
    }
  }

}
