import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ChatModel } from "./models/chat.model";
import { ChatTypeModel } from 'src/chat_types/models/chat_type.model';
import { Server, Socket } from 'socket.io';

import { ChatResponse } from './dto/chat-response.dto';
import { ChatRoom } from './dto/chat-room.dto';
import { ChatMessage } from './dto/chat-message.dto';
import { LoggedUserDto } from 'src/auth/dto/logged_user.dto';
import { ChatRoleModel } from 'src/chat_roles/models/chat_role.model';


@Injectable()
export class ChatsService {

  constructor(@InjectRepository(ChatModel) private chatsRepository: Repository<ChatModel>) { }
  clients = new Map<number, Socket>();

  findAll(): Promise<ChatModel[]> {
    return this.chatsRepository.find();
  }

  async findOneById(id: number): Promise<ChatModel> {
    try {
      const chat = await this.chatsRepository.findOneOrFail({
        where: { id: id },
        relations: { type: true, participants: { participant: true, role: true } }
      });
      return chat;
    }
    catch (error) {
      throw new NotFoundException('Chat id not found');
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
      this.chatsRepository.delete({ id: id });
    }
    catch (error) {
      throw new NotFoundException('Chat id not found');
    }
  }




  async identify(user: LoggedUserDto, client: Socket) {

    // this.clients.set(user.id, client);
  }

  async disconnect(client: Socket) {

    for (let key of this.clients.keys()) {
      if (this.clients.get(key)?.id == client.id) {

        this.clients.delete(key);
      }
    }
  }

  isIdentifed(client: Socket): boolean {
    
    for (let key of this.clients.keys()) {
      if (this.clients.get(key)?.id == client.id) {

        return true;
      }
    }

    return false;
  }

  async connectRoom(user: LoggedUserDto, client: Socket, room_id: number): Promise<ChatResponse<ChatRoom>> {
    // this.clientToUser
    // this.clients.set(user.id, client);

    let res = new ChatResponse<ChatRoom>();


    const room = await this.findOneById(room_id);

    if (room.participants.some(element => {
      return element.participant.id === user.id && element.role.id != ChatRoleModel.BAN_ROLE
    })) {

      client.join(room.toString());

      let newroom: ChatRoom = new ChatRoom();

      newroom.id = room_id;
      newroom.name = room.toString();

      newroom.messages = [];

      room.messages.forEach(value => {
        let msg: ChatMessage = new ChatMessage();
        msg.id = value.id;
        msg.senderId = value.sender.id;
        msg.senderDiplayName = value.sender.pseudo;
        msg.content = value.message;
  
        newroom.messages.push(msg);

      });

      res.value = newroom;
    }
    else {
      res.error = "Error";
    }

    return (res);
  }
}
