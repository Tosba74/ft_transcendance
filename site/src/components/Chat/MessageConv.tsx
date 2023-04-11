import React from "react";
import { ChatMessageDto } from "src/_shared_dto/chat-message.dto";
import MessageBulleRecv from "./MessageBulleRecv";
import MessageBulleSend from "./MessageBulleSend";
import MessageServer from "./MessageServer";

interface MessageConvProps {
  selfId: number;
  messages: ChatMessageDto[];
}

export default function MessageConv({ selfId, messages }: MessageConvProps) {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      {messages.map((message) => {
        return message.sender.id === -1 ? (
          <MessageServer text={message.content} />
        ) : message.sender.id === selfId ? (
          <MessageBulleSend
            key={message.id}
            user={message.sender}
            text={message.content}
          />
        ) : (
          <MessageBulleRecv
            key={message.id}
            user={message.sender}
            text={message.content}
          />
        );
      })}
      <div ref={messagesEndRef}></div>
    </>
  );
}
