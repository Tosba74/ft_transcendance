import { Injectable } from '@nestjs/common';


// import { io, Socket } from 'socket.io-client';

import { Message } from './dto/message.dto';
import { Room } from './dto/room.dto';
import { ChatResponse } from './dto/chat_response.dto';

import { joinRoom } from './gateway/joinroom';


@Injectable()
export class ChatService {

  clientToUser = new Map<string, string>(); // Map object utilisé pour stocker les utilisateurs qui sont abonnés au système de chat.

  joinRoom = joinRoom;


  quitChat(clientId: string) {
    this.clientToUser.delete(clientId);
  }


  getClientName(clientId: string): string | undefined {
    return this.clientToUser.get(clientId);
  }

  // async userIsTyping(name: string, isTyping: boolean): Promise<void> {
  //   if (isTyping === true)
  //     this.usersTyping.push(name);
  //   else
  //     this.usersTyping = this.usersTyping.filter(user => user !== name);
  // }

  // findAllUsersTyping(): string[] {
  //   return this.usersTyping;
  // }

  // vuejs doesnt implement Map (nor Set) type so we must return an array of object in our case
  // findAllUsers(): UserDto[] {
  //   const users: UserDto[] = Array.from(this.clientToUser, ([id, name]) => ({ id, name }));
  //   return users;
  // }

  // findAllMessages(): MessageDto[] {
  //   return this.messages;
  // }

}
