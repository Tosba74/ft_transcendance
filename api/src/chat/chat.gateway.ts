import {
	WebSocketGateway,
	SubscribeMessage,
	MessageBody,
	WebSocketServer,
	ConnectedSocket,
	// OnGatewayConnection,
	// OnGatewayDisconnect, 
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { MessageDto } from './dto/message.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway( {cors: { origin: '*' }} ) // a voir pour autoriser une liste de CORS directement via Nginx
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  // create and send message
  @SubscribeMessage('createMessage')
  async create(@MessageBody() input: MessageDto, @ConnectedSocket() client: Socket): Promise<MessageDto> {
	// add the new message to datastorage
	const newMessage: MessageDto = await this.chatService.create(input, client.id);
	// notify all the clients connected to the websocket that there is a new msg
	this.server.emit('message', newMessage);
	return newMessage;
  }
	
  // get old messages
  @SubscribeMessage('findAllMessages')
  findAll(): MessageDto[] {
    return this.chatService.findAll();
  }

  // join and identify myself (store name-socket)
  // (valeur/event pas utilisé pour l'instant)
  @SubscribeMessage('join')
  joinRoom(@MessageBody('name') name: string, @ConnectedSocket() client: Socket): IterableIterator<string> {
    return this.chatService.identify(name, client.id);
  }

  // alert when typing/stop typing
  @SubscribeMessage('typing')
  async typing(@MessageBody('isTyping') isTyping: boolean, @ConnectedSocket() client: Socket): Promise<void> {
    const name: string | undefined = await this.chatService.getClientName(client.id);
	// broadcoast.emit alerts everybody except myself
	client.broadcast.emit('typing', {name, isTyping});
  }

}
