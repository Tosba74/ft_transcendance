import React from "react";
import { UserDto } from "src/_shared_dto/user.dto";
import ChannelChannelList from "./ChannelChannelList";
import ChannelUserList from "./ChannelUserList";

interface ChannelPanelProps {
  setChannel: Function;
}

export default function ChannelPanel({ setChannel }: ChannelPanelProps) {
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

  let channels: string[] = ["chan 1", "chan 2"];

  return (
    <div>
      <ChannelChannelList lstChannel={channels} setChannel={setChannel} />
      <ChannelUserList users={users} />
    </div>
  );
}
// <ChatChannels />
