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
  --------- ADMIN COMMANDS  ---------
*/

  /* 
  Quit (not admin)
  Change password (confirmation ?)
  Remove password method
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
      command[0] = command[0].toLocaleLowerCase()

      responseMessage.id = -this.serverMsgId;
      responseMessage.sender = new UserDto();
      responseMessage.sender.id = -1;
      this.serverMsgId++;

      switch (command[0]) {

        // Owner permission required
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


  async changepwCommand(room: ChatModel, user: UserDto, command: string[]): Promise<string> {
    return 'Changepw: done';
  }


  async removepwCommand(room: ChatModel, user: UserDto, command: string[]): Promise<string> {
    return 'Removepw: done';
  }

  // users need a quit command 
  async inviteCommand(room: ChatModel, user: UserDto, command: string[]): Promise<string> {
    if (command.length != 2)
      return `${command[0]}: argument error`;

    if (room.type.name != 'private') {
      return `invite: this is a ${room.type.name} channel. Only private channel accept invitations.`;
    }

    let userToInvite = parseInt(command[1]);

    const found = room.participants.find(value => (value.participant.id == userToInvite))
    if (found) {
      if (found.role.id == ChatRoleModel.BAN_ROLE)
        return `invite: ${userToInvite} is banned of this channel`;
      if (userToInvite == user.id)
        return `invite: you're already in this channel`;
      return `invite: ${userToInvite} is already in this channel`;
    }

    try {
      await this.chatParticipantsService.create(userToInvite, room.id, ChatRoleModel.USER_ROLE);
    } catch (error) {
      return `invite: user not found`;
    }

    return 'Invite:  done';
  }

  // sender is the admin who typed the cmd, receiver is the user targeted by the cmd
  async commandPermission(room:ChatModel, command: string[], senderId: number, receiverId: number, roleToAssign=-1): Promise<string | undefined> {

    if (command.length != 2)
      return `${command[0]}: argument error`;

    // not to yourself
    if (receiverId == senderId)
      return `${command} : Cannot ${command} yourself`;

    try {
      const receiverRole = await this.chatParticipantsService.get_role(receiverId, room.id);

      // already the targeted role (kick has no role to assign so does not enter this condition)
      if (roleToAssign != -1 && receiverRole === roleToAssign) {

        let message = '';
        switch (command[0]) {
          case "/promote":
            message = `promote: no effect, ${receiverId} is already admin`;
            break;
          case "/demote":
            message = `demote: no effect, ${receiverId} has no special permission`;
            break;
          case "/ban":
            message = `ban: no effect, ${receiverId} already banned`;
            break;
          case "/unban":
            message = `unban: no effect, ${receiverId} already in the channel`;
            break;
        }

        return message;
      }
      // admin cant touch admin
      else if (receiverRole === ChatRoleModel.ADMIN_ROLE) {
        const senderRole = await this.chatParticipantsService.get_role(senderId, room.id);
        if (senderRole !== ChatRoleModel.OWNER_ROLE)
          return `${command}: lack of permission: ${receiverId} is also Admin. Refer to the Owner.`;
      }
    } catch (error) {
      return `${command}: ${receiverId} not found or no relation with this channel`;
    }

    // nobody can touch the owner
    if (room.participants.find(value => (value.participant.id == receiverId && value.role.id == ChatRoleModel.OWNER_ROLE)))
      return `${command}: lack of permission: ${receiverId} is the owner of this channel`;

    return undefined;
  }


  async promoteCommand(room: ChatModel, user: UserDto, command: string[]): Promise<string> {

    let userToPromote = parseInt(command[1]);

    const permission = await this.commandPermission(room, command, user.id, userToPromote, ChatRoleModel.ADMIN_ROLE);
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
      return "Promote : user not found or not in this channel";
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

    return "Promote : done";
  }


  async demoteCommand(room: ChatModel, user: UserDto, command: string[]): Promise<string> {

    let userToDemote = parseInt(command[1]);
    
    const permission = await this.commandPermission(room, command, user.id, userToDemote, ChatRoleModel.USER_ROLE);
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
      return "Demote : user not found or not in this channel";
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
    
    return "Demote : done";
  }


  async kickCommand(room: ChatModel, user: UserDto, command: string[]): Promise<string> {

    let userToKick = parseInt(command[1]);

    const permission = await this.commandPermission(room, command, user.id, userToKick);
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

      return "Kick : done";

    }
    else {
      return "Kick : user not found or connected";
    }
  }
  

  async banCommand(room: ChatModel, user: UserDto, command: string[]): Promise<string> {

    let userToBan = parseInt(command[1]);

    const permission = await this.commandPermission(room, command, user.id, userToBan, ChatRoleModel.BAN_ROLE);
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
      return "Ban : user not found or not in this channel";
    }
    return "Ban : done";
  }


  async unbanCommand(room: ChatModel, user: UserDto, command: string[]): Promise<string> {

    if (command.length == 2) {

      let userToUnban = parseInt(command[1]);

      const permission = await this.commandPermission(room, command, user.id, userToUnban, ChatRoleModel.USER_ROLE);
      if (permission !== undefined)
        return permission

      let newRole = new UpdateRoleDto();
      newRole.new_role = ChatRoleModel.USER_ROLE;
      newRole.participantId = userToUnban;
      newRole.roomId = room.id;
      try {
        await this.chatParticipantsService.update_role(newRole);
      } catch (error) {
        return "Unban : user not found or not in this channel";
      }
      return "Unban : done";

    }
    else {
      return "Unban : Argument error";
    }
  }


  async roleCommand(room: ChatModel, user: UserDto, command: string[]): Promise<string> {
    let targetUser = parseInt(command[1]);
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
      return "Role:  user not found or not in this channel";
    }
  }

}
