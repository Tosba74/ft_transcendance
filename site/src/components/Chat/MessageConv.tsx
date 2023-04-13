import React from "react";

import { ChatMessageDto } from "src/_shared_dto/chat-message.dto";
import { UseLoginDto } from "../Log/dto/useLogin.dto";
import MessageBulleRecv from "./MessageBulleRecv";
import MessageBulleSend from "./MessageBulleSend";
import MessageServer from "./MessageServer";
import { UseChatDto } from "./dto/useChat.dto";
import { UseGameDto } from "../Game/dto/useGame.dto";

interface MessageConvProps {
  loginer: UseLoginDto;
  selfId: number;
  messages: ChatMessageDto[];
  chats: UseChatDto;
  gamer: UseGameDto;
}

export default function MessageConv({
  selfId,
  messages,
  loginer,
  chats,
  gamer,
}: MessageConvProps) {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const [first, setFirst] = React.useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  React.useEffect(() => {
    if (first) {
      setTimeout(() => {
        scrollToBottom();
        setFirst(false);
      }, 500);
    } else {
      scrollToBottom();
    }
  }, [messages, first]);

  return (
    <>
      {messages.map((message) => {
        return message.sender.id === -1 ? (
          <MessageServer text={message.content} />
        ) : message.sender.id === selfId ? (
          <MessageBulleSend
            key={message.id}
            user={message.sender}
            gamer={gamer}
            message={message}
          />
        ) : (
          <MessageBulleRecv
            key={message.id}
            user={message.sender}
            message={message}
            loginer={loginer}
            chats={chats}
            gamer={gamer}
          />
        );
      })}
      <div ref={messagesEndRef}></div>
    </>
  );
}
