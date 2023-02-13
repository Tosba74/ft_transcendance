import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { Message } from '../dto/message.dto';
import { Room } from '../dto/room.dto';
import { ChatResponse } from '../dto/chat_response.dto';
// import { ChatGateway } from '../chat.gateway';

import { ChatService } from '../chat.service';

export async function joinRoom(this: ChatService, client: Socket, room: string) : Promise<ChatResponse<Room>> {


    // this.clientToUser

    let res = new ChatResponse<Room>();

    // await this.chatService.identify(name, client.id);

    let requestedRoomId: number = 1;

    //Check if user can join room
    if (requestedRoomId == 1) {
        client.join(room);

        let newroom: Room = new Room();

        newroom.id = 1;
        newroom.name = room;

        newroom.messages = [];

        for (let i: number = 0; i < 5; i++) {
            let msg: Message = new Message();
            msg.id = i + 10;
            msg.senderId = 30;
            msg.senderDiplayName = "Moi";
            msg.content = "text";

            newroom.messages.push(msg);
        }

        res.value = newroom;
    }
    else {
        res.error = "Error";
    }

    return (res);
}