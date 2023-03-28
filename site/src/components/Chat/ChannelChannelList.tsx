import { useState } from "react";
import { Link } from "react-router-dom";
import { UserDto } from "src/_shared_dto/user.dto";

import { Channel } from "./Channel";

interface ChannelChannelListProps {
  lstChannel: string[];
  setChannel: Function;
}

export default function ChannelChannelList({
  lstChannel,
  setChannel,
}: ChannelChannelListProps) {
  //

  // const [channels] = useState<Channel[]>(Mock_Channel);
  return (
    <div className="shadow-inner-lg h-1/3 rounded-md bg-gray-800 p-2">
      <div className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
        {lstChannel.map((channel) => (
          <div>
            <button
              type="button"
              onClick={() => {
                setChannel(lstChannel);
              }}
            >
              <strong>{lstChannel}</strong> <small>{lstChannel}</small>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
