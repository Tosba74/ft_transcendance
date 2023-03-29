import { useState } from "react";
import { Link } from "react-router-dom";
import { UserDto } from "src/_shared_dto/user.dto";

import { ChatRoom } from "src/_shared_dto/chat-room.dto";

interface ChannelChannelListProps {
  currChannel: number;
  lstChannel: { [key: string]: ChatRoom } | undefined;
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


  const handleChange = (chan: ChatRoom) => {
    setChannel(chan.id);
    setModeChannel();
  };

  // const [channels] = useState<Channel[]>(Mock_Channel);
  return (
    <div className="shadow-inner-lg  h-1/3 w-full rounded-md bg-gray-800 p-2 p-2">
      <div className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">

        {lstChannel && Object.keys(lstChannel).map(key => {
          return (

            <div key={lstChannel[key].id}>
              <button
                type="button"
                onClick={() => {
                  handleChange(lstChannel[key]);
                }}
              >
                <strong>{lstChannel[key].name}</strong>
              </button>
            </div>
          )
        })
        }
      </div>
    </div>
  );
}
