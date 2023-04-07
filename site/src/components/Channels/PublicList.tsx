import React from "react";
import axios from "axios";
import classNames from "classnames";

import { MdPublic } from "react-icons/md";
import { FiRefreshCw } from "react-icons/fi";

import { ChannelDto } from "src/_shared_dto/channel.dto";
import { UseLoginDto } from "../Log/dto/useLogin.dto";
import IconSwitch from "./IconSwitch";

interface PublicListProps {
  loginer: UseLoginDto;
  setErrorMessage: Function;
  reload: boolean;
  doReload: Function;
}

export default function PublicList({
  loginer,
  setErrorMessage,
  reload,
  doReload,
}: PublicListProps) {
  const [channels, setChannels] = React.useState<ChannelDto[]>([]);
  const [effect, setEffect] = React.useState(false);

  function refreshData() {
    setEffect(true);

    axios
      .get("/api/me/chats/available", loginer.get_headers())
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

  function joinChannel(id: number) {
    axios
      .post(`/api/me/chats/join/${id}`, {}, loginer.get_headers())
      .then((res) => {
        if (res.status === 201) {
          doReload();

          return;
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.message !== undefined) {
          setErrorMessage(error.response.data.message);
        }

        if (error.response.status === 412) {
          doReload();
        }
      });
  }

  React.useEffect(() => {
    refreshData();
  }, [reload]);

  return (
    <div className="border-blueGray-200 h-full mt-2 shadow border-b pt-1 flex flex-row flex-wrap">
      <div className="w-full flex flex-col">
        <div className="shadow-b mx-20 h-9 mb-4 items-center justify-center border-b border-gray-900">

          <h3 className="text-blueGray-700 mb-5 flex items-center justify-center text-center text-2xl font-semibold leading-normal">
            <MdPublic className="mr-1 inline-block" />
            Public Channels
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
            return (
              <div
                key={channel.id}
                className="text-blueGray-700 mb-2 flex text-lg"
              >
                <div className="flex basis-5/6">
                  <li className="w-14 basis-5/6 truncate">{channel.name}</li>
                  <IconSwitch channel={channel} />
                </div>
                <button
                  className="basis-1/4 self-center rounded bg-blue-500 	font-bold text-white hover:bg-blue-700"
                  type="button"
                  onClick={() => {
                    joinChannel(channel.id);
                  }}
                >
                  join
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
