import { Message } from './message.dto';

export class Room{
	id: number;
	name: string;

    messages: Message[];
}
