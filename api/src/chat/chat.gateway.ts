import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { ChatService } from './chat.service';
// import { ChatUser } from './dto/user.dto';
import { Server, Socket } from 'socket.io';


import { ChatMessage } from './dto/chat_message.dto';
import { ChatRoom } from './dto/chat_room.dto';
import { ChatResponse } from './dto/chat_response.dto';

@WebSocketGateway({ cors: { origin: '*' } }) // a voir pour autoriser une liste de CORS directement via Nginx
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

	@WebSocketServer() server: Server;
	constructor(private readonly chatService: ChatService) { }
	

	handleConnection(): void {

	}

	handleDisconnect(@ConnectedSocket() client: Socket): void {

		// this.chatService.leaveAllRooms(client);
	}

	
	@SubscribeMessage('joinRoom')
	async joinRoom(client: Socket, body: { room: string }): Promise<ChatResponse<ChatRoom>> {

		return (this.chatService.joinRoom(client, body.room))
	}

	// create and send message
	@SubscribeMessage('createMessage')
	// async create(@MessageBody() input: MessageDto, @ConnectedSocket() client: Socket): Promise<MessageDto> {
	async createMessage(client: Socket, body: { room: string, message: ChatMessage }): Promise<ChatResponse<undefined>> {

		let res = new ChatResponse<undefined>();
		
		//Check if user can send in room
		if (1 == 1)
		{
			if (body.message.content.startsWith("/") == true)
			{
				let responseMessage = new ChatMessage();
				responseMessage.id = -1;
				responseMessage.senderDiplayName = 'Server';
				responseMessage.senderId = -1;
				responseMessage.content = 'Command done';

				client.emit('broadcastMessage', { room: body.room, message: responseMessage })
				// this.server.emit('broadcastMessage', { room: body.room, message: body.message });
				
				
			}
			else
			{
				this.server.to(body.room).emit('broadcastMessage', { room: body.room, message: body.message });
			}
		}

		return (res);
	}
}
