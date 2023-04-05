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
  //
  // let users: UserDto[] = [
  //   {
  //     id: 1,
  //     login_name: "jjaqueme",
  //     pseudo: "jerome",
  //     color: 10,
  //     avatar_url: ".",
  //     is_admin: false,
  //   },
  //   {
  //     id: 2,
  //     login_name: "jjaqueme",
  //     pseudo: "jerome",
  //     color: 10,
  //     avatar_url: ".",
  //     is_admin: false,
  //   },
  //   {
  //     id: 3,
  //     login_name: "jjaqueme",
  //     pseudo: "jerome",
  //     color: 10,
  //     avatar_url: ".",
  //     is_admin: false,
  //   },
  //   {
  //     id: 4,
  //     login_name: "jjaqueme",
  //     pseudo: "jerome",
  //     color: 10,
  //     avatar_url: ".",
  //     is_admin: false,
  //   },
  // ];

  // let channels: ChannelDto[] = [
  //   {
  //     id: 1,
  //     name: "les coupaiz",
  //   },
  //   {
  //     id: 2,
  //     name: "general",
  //   },
  //   {
  //     id: 3,
  //     name: "workspace",
  //   },
  //   {
  //     id: 4,
  //     name: "cluster 4",
  //   },
  // ];

  console.log(chats.rooms && chats.rooms[currChannel.toString()]);

  return (
    <div className="mt-2 h-full w-full rounded p-2 shadow dark:bg-gray-700 ">
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
    </div>
  );
}
// <ChatChannels />
