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
    <div className="shadow-inner-lg h-1/3 w-full rounded-md bg-gray-300 p-4 dark:bg-gray-800">
      <div className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
        {lstChannel &&
          Object.keys(lstChannel).map((key) => {
            return (
              <div
                className="flex w-full flex-row items-center gap-4"
                key={lstChannel[key].id}
              >
                <div className="justify-center justify-items-center text-start dark:text-white">
                  Logo
                </div>
                <div className="flex basis-5/6">
                  <li className="w-14 basis-5/6 truncate">
                    {lstChannel[key].name}
                  </li>
                  {lstChannel[key].password && (
                    <MdKey
                      className="basis-1/6 self-center "
                      title="Protected"
                    />
                  )}
                  {!lstChannel[key].password && lstChannel[key].type == 1 && (
                    <MdOutlineEmail
                      className="basis-1/6 self-center"
                      title="Chat"
                    />
                  )}
                  {!lstChannel[key].password && lstChannel[key].type == 2 && (
                    <MdPublic
                      className="basis-1/6 self-center"
                      title="Public"
                    />
                  )}
                  {!lstChannel[key].password && lstChannel[key].type == 3 && (
                    <FiLock className="basis-1/6 self-center" title="Private" />
                  )}
                </div>
                <button
                  className="w-5/6 justify-center text-start dark:text-white"
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
                  className="h-8 w-8 justify-center bg-cyan-500 p-2 text-white"
                >
                  JOIN
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
