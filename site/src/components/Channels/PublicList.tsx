import React from "react";
import axios from "axios";
import classNames from "classnames";

import { MdPublic } from "react-icons/md";
import { FiRefreshCw } from "react-icons/fi";

import { ChannelDto } from "src/_shared_dto/channel.dto";
import { UseLoginDto } from "../Log/dto/useLogin.dto";
import IconSwitch from "./IconSwitch";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";

const startEL = document.getElementById("root");

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
  const css = {
    top: `${document.getElementById("startPage")?.offsetTop}px`,
  };
  const ref = React.useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [pageMessage, setPageMessage] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [channels, setChannels] = React.useState<ChannelDto[]>([]);
  const [effect, setEffect] = React.useState(false);
  const [portal, setPortal] = React.useState(false);

  const handleSubmit = async (id: number) => {
      axios
        .post(
          `/api/me/chats/join/${id}`,
          {
            password: password,
          },
          loginer.get_headers()
        )
        .then((res) => {
          console.log(res.status);
          if (res.status == 201) {
			setPageMessage("");
            doReload();
            setPortal(false);
            setPassword("");
          } //
        })
        .catch(() => setPageMessage("Join Channel error"));
      // }

  };

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
      .catch((error) => {
        console.log(error);
        if (error.response.data.message !== undefined) {
          setErrorMessage(error.response.data.message);
        }

        if (error.response.status === 412) {
          doReload();
        }
      });

    setTimeout(() => {
      setEffect(false);
    }, 1000);
  }

  React.useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (ref) {
        if (portal && !ref.current?.contains(e.target)) {
          setEffect(false);
        }
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [portal]);

  React.useEffect(() => {
    refreshData();
  }, [reload]);

  return (
    <div className="border-blueGray-200 mt-2 flex h-full flex-row flex-wrap border-b pt-1 shadow">
      <div className="flex w-full flex-col">
        <div className="shadow-b mx-20 mb-4 h-9 items-center justify-center border-b border-gray-900">
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
                    if (channel.password) {
                      setPortal(true);
                      setEffect(true);
                    } else
					{
						handleSubmit(channel.id);
					}
                  }}
                >
                  join
                </button>
                {portal &&
                  startEL !== null &&
                  createPortal(
                    <div
                      style={css}
                      ref={ref}
                      className={classNames(
                        "absolute left-1/2 mt-36 grid w-auto min-w-[250px] max-w-md -translate-x-1/2 grid-cols-2 items-center gap-2 rounded-lg bg-gray-100 p-4 px-16 shadow-lg dark:bg-gray-700 dark:text-white",
                        effect
                          ? "opacity-1 animate-fadeIn"
                          : "animate-fadeOut opacity-0"
                      )}
                      onAnimationEnd={() => {
                        if (!effect) {
                          setPortal(false);
                          setPageMessage("");
                          setPassword("");
                        }
                      }}
                    >
                      <h3 className="col-span-2 text-center text-xl">
                        Password
                      </h3>

                      <label className="relative right-2 ml-auto cursor-pointer">
                        Password
                      </label>
                      <input
                        type="text"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="right-0 ml-auto mr-2 max-w-[100px] rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-300 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="Type here"
                      />

                      <button
                        onClick={() => {handleSubmit(channel.id)}}
                        className="col-span-2 mx-auto mt-3 whitespace-nowrap rounded-lg bg-cyan-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Join
                      </button>
                      <div className="col-span-2 text-center text-sm">
                        {pageMessage}
                      </div>
                    </div>,
                    startEL
                  )}
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
