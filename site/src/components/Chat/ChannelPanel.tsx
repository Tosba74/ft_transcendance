import React from "react";
import { ChannelDto } from "src/_shared_dto/ChannelDto";
import { UserDto } from "src/_shared_dto/user.dto";
import ChannelChannelList from "./ChannelChannelList";
import ChannelUserList from "./ChannelUserList";

interface ChannelPanelProps {
  currChannel: number;
  setChannel: Function;
  setModeChannel: Function;
}

export default function ChannelPanel({
  currChannel,
  setChannel,
  setModeChannel,
}: ChannelPanelProps) {
  let users: UserDto[] = [
    {
      id: 1,
      login_name: "jjaqueme",
      pseudo: "jerome",
      color: 10,
      avatar_url: ".",
      is_admin: false,
    },
    {
      id: 2,
      login_name: "jjaqueme",
      pseudo: "jerome",
      color: 10,
      avatar_url: ".",
      is_admin: false,
    },
    {
      id: 3,
      login_name: "jjaqueme",
      pseudo: "jerome",
      color: 10,
      avatar_url: ".",
      is_admin: false,
    },
    {
      id: 4,
      login_name: "jjaqueme",
      pseudo: "jerome",
      color: 10,
      avatar_url: ".",
      is_admin: false,
    },
  ];

  let channels: ChannelDto[] = [
    {
      id: 1,
      name: "les coupaiz",
    },
    {
      id: 2,
      name: "general",
    },
    {
      id: 3,
      name: "workspace",
    },
    {
      id: 4,
      name: "cluster 4",
    },
  ];

  return (
    <div className="h-full">
      <ChannelChannelList
        lstChannel={channels}
        currChannel={currChannel}
        setChannel={setChannel}
        setModeChannel={setModeChannel}
      />
      <ChannelUserList users={users} />
    </div>
  );
}
// <ChatChannels />
