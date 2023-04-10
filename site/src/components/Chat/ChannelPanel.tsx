import React from "react";
import { UserDto } from "src/_shared_dto/user.dto";
import ChannelChannelList from "./ChannelChannelList";
import ChannelUserList from "./ChannelUserList";
import ChatIcon from "./ChatIcon";
import { UseChatDto } from "./dto/useChat.dto";

interface ChannelPanelProps {
  currChannel: number;
  setChannel: Function;
  setModeChannel: Function;
  chats: UseChatDto;
}

export default function ChannelPanel({
  currChannel,
  setChannel,
  setModeChannel,
  chats,
}: ChannelPanelProps) {
  console.log(chats.rooms && chats.rooms[currChannel.toString()]);

  return (
    <>
      <ChannelChannelList
        lstChannel={chats.rooms}
        currChannel={currChannel}
        setChannel={setChannel}
        setModeChannel={setModeChannel}
      />
      <ChannelUserList
        users={
          (chats.rooms &&
            chats.rooms[currChannel] &&
            chats.rooms[currChannel].participants) ||
          []
        }
      />
    </>
  );
}
