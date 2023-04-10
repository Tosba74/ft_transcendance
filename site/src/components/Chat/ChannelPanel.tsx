import React from "react";
import { UserDto } from "src/_shared_dto/user.dto";
import ChannelChannelList from "./ChannelChannelList";
import ChannelUserList from "./ChannelUserList";
import ChatIcon from "./ChatIcon";
import { UseChatDto } from "./dto/useChat.dto";

interface ChannelPanelProps {
  chats: UseChatDto;
}

export default function ChannelPanel({ chats }: ChannelPanelProps) {
  console.log(chats.rooms && chats.rooms[chats.currChannel.toString()]);

  return (
    <div className="mt-2 h-full w-full rounded bg-gray-200 p-2 shadow dark:bg-gray-700 ">
      <ChannelChannelList
        lstChannel={chats.rooms}
        currChannel={chats.currChannel}
        setChannel={chats.setCurrChannel}
        setModeChannel={chats.setModeChannel}
      />
      <ChannelUserList
        users={
          (chats.rooms &&
            chats.rooms[chats.currChannel] &&
            chats.rooms[chats.currChannel].participants) ||
          []
        }
      />
    </div>
  );
}
// <ChatChannels />
