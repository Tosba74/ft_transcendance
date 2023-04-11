import React from "react";
import axios from "axios";
import classNames from "classnames";

import { MdPlace } from "react-icons/md";
import { FiRefreshCw } from "react-icons/fi";

import { ChannelDto } from "src/_shared_dto/channel.dto";
import { UseLoginDto } from "../Log/dto/useLogin.dto";
import { UseChatDto } from "../Chat/dto/useChat.dto";
import IconSwitch from "./IconSwitch";

interface CurrentListProps {
  loginer: UseLoginDto;
  chats: UseChatDto;
  setErrorMessage: Function;
  reload: boolean;
}
export default function CurrentList({
  loginer,
  chats,
  setErrorMessage,
  reload,
}: CurrentListProps) {
  const [channels, setChannels] = React.useState<ChannelDto[]>([]);
  const [effect, setEffect] = React.useState(false);

  function refreshData() {
    setEffect(true);

    axios
      .get("/api/me/chats/joined", loginer.get_headers())
      .then((res) => {
        if (res.status === 200) {
          setChannels(res.data as ChannelDto[]);

          return;
        }
      })
      .catch((error) => { });

    setTimeout(() => {
      setEffect(false);
    }, 1000);
  }

  React.useEffect(() => {
    refreshData();
  }, [reload]);

  return (
    <div className="border-blueGray-200 mt-2 flex h-full flex-row flex-wrap border-b pt-1 shadow">
      <div className="flex w-full flex-col">
        <div className="shadow-b mx-20 mb-4 h-9 items-center justify-center border-b border-gray-900">
          <h3 className="text-blueGray-700 mb-5 flex items-center justify-center text-center text-2xl font-semibold leading-normal">
            <MdPlace className="mr-1 inline-block" />
            Current Channel
            <FiRefreshCw
              className={classNames(
                "ml-2 inline-block cursor-pointer text-xl",
                { "animate-spin": effect }
              )}
              title="Force reload"
              onClick={refreshData}
            />
          </h3>
        </div>

        <ul className="grow overflow-y-scroll px-1">
          {channels.map((channel) => {
            let role = '';
            if (channel.role === 2)
              role = ` (Admin)`
            if (channel.role === 3)
              role = ` (Owner)`
            return (
              <div
                key={channel.id}
                className="text-blueGray-700 mb-2 flex text-lg"
              >
                <div className="flex basis-5/6">
                  <li className="w-14 basis-5/6 truncate">{channel.name} {role}</li>
                  <IconSwitch channel={channel} />
                </div>
                <button
                  className="w-14 basis-1/4 rounded bg-blue-500 font-bold text-white hover:bg-blue-700"
                  type="button"
                  id="btn_join"
                  onClick={() => {
                    chats.connectRoom(channel.id, setErrorMessage);
                  }}
                >
                  open
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
