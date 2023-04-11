import React from "react";
import { ChatMessageDto } from "src/_shared_dto/chat-message.dto";
import MessageBulleRecv from "./MessageBulleRecv";
import MessageBulleSend from "./MessageBulleSend";
import MessageServer from "./MessageServer";
import { UseLoginDto } from "../Log/dto/useLogin.dto";

interface MessageConvProps {
  selfId: number;
  messages: ChatMessageDto[];
  loginer: UseLoginDto;
}

export default function MessageConv({
  selfId,
  messages,
  loginer,
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
      }, 500);
      setFirst(false);
    } else {
      scrollToBottom();
    }
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
            loginer={loginer}
          />
        );
      })}
      <div ref={messagesEndRef}></div>
    </>
  );
}
