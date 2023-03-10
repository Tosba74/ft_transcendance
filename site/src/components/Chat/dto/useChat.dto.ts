import { StringMappingType } from 'typescript';
import { ChatMessage } from './chat-message.dto';

export interface UseChatDto {
	messages: { [key: number]: ChatMessage[] } | undefined;
    identify: Function;
    connectRoom: Function;
    sendMessage: Function;
}
