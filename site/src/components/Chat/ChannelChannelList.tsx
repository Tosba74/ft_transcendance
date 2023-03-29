import { useState } from "react";
import { Link } from "react-router-dom";
import { UserDto } from "src/_shared_dto/user.dto";

import { ChannelDto } from "src/_shared_dto/ChannelDto";

interface ChannelChannelListProps {
  currChannel: number;
  lstChannel: ChannelDto[];
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

  const handleChange = (chan: ChannelDto) => {
    setChannel(chan.id);
    setModeChannel();
  };

  // const [channels] = useState<Channel[]>(Mock_Channel);
  return (
    <div className="shadow-inner-lg  h-1/3 w-full rounded-md bg-gray-800 p-2">
      <div className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
        {lstChannel.map((channel) => (
          <div>
            <button
              type="button"
              onClick={() => {
                handleChange(channel);
              }}
            >
              <strong>{channel.name}</strong>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
