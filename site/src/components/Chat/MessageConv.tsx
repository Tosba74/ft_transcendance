import { ChatMessage } from "src/_shared_dto/chat-message.dto";
import MessageBulleRecv from "./MessageBulleRecv";
import MessageBulleSend from "./MessageBulleSend";

interface MessageConvProps {
  selfId: number;
  messages: ChatMessage[];


}

export default function MessageConv({ selfId, messages }: MessageConvProps) {
  return (
    <>
      {messages.map((message) => {
        return (message.senderId == selfId ? 
          <MessageBulleSend text={message.content} /> :
          <MessageBulleRecv text={message.content} />

        )
      })

      }
    </>
  );
}
