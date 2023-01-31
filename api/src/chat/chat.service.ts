import { Injectable } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class ChatService {
  messages: MessageDto[] = []; // tableau de MessageDto utilisé pour stocker les messages envoyés
  clientToUser = new Map<string, string>(); // Map object utilisé pour stocker les utilisateurs qui sont abonnés au système de chat.
  
  // creer et stock un nouveau message dans le tableau + retourne ce message
  create(message: MessageDto, clientId: string): MessageDto {
	const newMessage: MessageDto = {
		name: this.clientToUser.get(clientId),
		text: message.text
	};
	this.messages.push(newMessage);
	return newMessage;
  }

  // stocke le username dans clientToUser en utilisant clientId (socket.id) comme clé
  // retourne un itérateur qui contient les clés de chaque élément de l'objet Map dans l'ordre d'insertion
  identify(name: string, clientId: string): IterableIterator<string> {
	this.clientToUser.set(clientId, name);
	return this.clientToUser.keys();
  }

  quitChat(clientId: string) {
	this.clientToUser.delete(clientId);
  }

  // retourne le nom du client correspondante a la key (socket.id)
  getClientName(clientId: string): string | undefined {
	return this.clientToUser.get(clientId);
  }

  findAllUsers(): UserDto[] {
	const users: UserDto[] = Array.from(this.clientToUser, ([id, name]) => ({ id, name }));
	return users;
  }

  findAllMessages(): MessageDto[] {
    return this.messages;
  }

}
