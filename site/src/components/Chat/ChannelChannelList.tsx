import { useState } from "react";
import { Link } from "react-router-dom";
import { UserDto } from "src/_shared_dto/user.dto";

import { MdKey } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { MdPublic } from "react-icons/md";
import { FiLock } from "react-icons/fi";

import { ChatRoomDto } from "src/_shared_dto/chat-room.dto";

interface ChannelChannelListProps {
  currChannel: number;
  lstChannel: { [key: string]: ChatRoomDto } | undefined;
  setChannel: Function;
  setModeChannel: Function;
}

export default function ChannelChannelList({
  currChannel,
  lstChannel,
  setChannel,
  setModeChannel,
}: ChannelChannelListProps) {
  //

  const handleShow = (chan: ChatRoomDto) => {
    setChannel(chan.id);
  };
  const handleChange = (chan: ChatRoomDto) => {
    setChannel(chan.id);
    setModeChannel();
  };

  // const [channels] = useState<Channel[]>(Mock_Channel);
  return (
    <div className="scrollbar-thumb-blue mt-2 scrollbar-thumb-rounded bg-gray-400 scrollbar-track-blue-lighter scrollbar-w-1 scrolling-touch h-1/3 w-full overflow-y-auto rounded rounded-b bg-gray-300 py-1 px-4 shadow-inner dark:bg-gray-800 dark:text-white">
      {lstChannel &&
        Object.keys(lstChannel).map((key) => {
          return (
            <div
              className="mt-1 flex w-full flex-row items-center justify-center gap-2"
              key={lstChannel[key].id}
            >
              <li
                className="w-6 list-none items-center justify-center"
                key={lstChannel[key].id}
              >
                {lstChannel[key] && (
                  //   {lstChannel[key].password && (
                  <MdKey className="" title="Protected" />
                )}
                {!lstChannel[key] && lstChannel[key].type == 1 && (
                  //   {!lstChannel[key].password && lstChannel[key].type == 1 && (
                  <MdOutlineEmail className="" title="Chat" />
                )}
                {!lstChannel[key] && lstChannel[key].type == 2 && (
                  //   {!lstChannel[key].password && lstChannel[key].type == 2 && (
                  <MdPublic className="" title="Public" />
                )}
                {!lstChannel[key] && lstChannel[key].type == 3 && (
                  //   {!lstChannel[key].password && lstChannel[key].type == 3 && (
                  <FiLock className="" title="Private" />
                )}
              </li>
              <button
                className="flex w-5/6 justify-start dark:text-white"
                type="button"
                onClick={() => {
                  handleShow(lstChannel[key]);
                }}
              >
                <strong>{lstChannel[key].name}</strong>
              </button>

              <button
                type="button"
                onClick={() => handleChange(lstChannel[key])}
                className="justify-center rounded bg-cyan-500 p-1 px-2 text-white"
              >
                JOIN
              </button>
            </div>
          );
        })}
    </div>
  );
}
