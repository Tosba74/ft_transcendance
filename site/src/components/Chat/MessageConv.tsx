import React from "react";
import { ChatMessageDto } from "src/_shared_dto/chat-message.dto";
import MessageBulleRecv from "./MessageBulleRecv";
import MessageBulleSend from "./MessageBulleSend";

interface MessageConvProps {
  selfId: number;
  messages: ChatMessageDto[];
}

export default function MessageConv({ selfId, messages }: MessageConvProps) {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      {messages.map((message) => {
        return message.sender.id == selfId ? (
          <MessageBulleSend user={message.sender} text={message.content} />
        ) : (
          <MessageBulleRecv user={message.sender} text={message.content} />
        );
      })}
      <div id="scrollbottom" ref={messagesEndRef}></div>
    </>
  );
}
