import React from "react";
import ChatBulleRecv from "./ChatBulleRecv";
import ChatBulleSend from "./ChatBulleSend";
import { Channel } from "./Channel";

interface ChatChannelProps {
  chan: Channel;
}

export default function ChatChannel({ chan }: ChatChannelProps) {
  return (
    <div>
      <div className="bg-yellow-400">{chan.name}</div>
      <ChatBulleRecv />
      <div>
        <ChatBulleRecv />
        <ChatBulleSend />
        <ChatBulleRecv />
        <ChatBulleSend />
        <ChatBulleSend />
      </div>
    </div>
  );
}
// <ChatChannels />
