import React from "react";
import classNames from "classnames";
import { createPortal } from "react-dom";

import CurrentList from "./CurrentList";

import { UseLoginDto } from "../Log/dto/useLogin.dto";
import { UseChatDto } from "../Chat/dto/useChat.dto";
import PublicList from "./PublicList";
import BannedList from "./BannedList";
import { Link } from "react-router-dom";

interface ChannelsPageProps {
  loginer: UseLoginDto;
  chats: UseChatDto;
}

export default function ChannelsPage({ loginer, chats }: ChannelsPageProps) {
  const rootEl = document.getElementById("root");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [portalEffect, setPortalEffect] = React.useState(false);
  const [reload, setReload] = React.useState(false);

  const [selectedMenu, setSelectedMenu] = React.useState("current");

  function doReload() {
    setReload((old) => !old);
  }

  const inactiveStyle =
    "bg-white dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700";
  const activeStyle = "active bg-gray-100 text-gray-900";

  //
  return (
    <>
      <div className="mx-auto flex h-5/6 max-w-[600px] flex-col px-4">
        <ul className="mt-2 divide-x divide-gray-200 rounded-lg text-center text-sm font-medium text-gray-500 shadow dark:divide-gray-700 dark:text-gray-400 flex">
          <li className="w-full">
            <div
              onClick={() => setSelectedMenu("public")}
              className={classNames(
                "inline-block w-full rounded-l-lg p-4 dark:bg-gray-700 dark:text-white",
                selectedMenu === "public" ? activeStyle : inactiveStyle
              )}
            >
              Public
            </div>
          </li>
          <li className="w-full">
            <div
              onClick={() => setSelectedMenu("banned")}
              className={classNames(
                "inline-block w-full p-4  hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white",
                selectedMenu === "banned" ? activeStyle : inactiveStyle
              )}
            >
              Banned
            </div>
          </li>
          <li className="w-full">
            <div
              onClick={() => setSelectedMenu("current")}
              className={classNames(
                "inline-block w-full rounded-r-lg p-4 hover:bg-gray-50  hover:text-gray-700",
                selectedMenu === "current" ? activeStyle : inactiveStyle
              )}
            >
              Current
            </div>
          </li>
        </ul>

        {selectedMenu === "public" && (
          <div className="flex h-full flex-col">
            <PublicList
              loginer={loginer}
              setErrorMessage={setErrorMessage}
              reload={reload}
              doReload={doReload}
            />
          </div>
        )}

        {selectedMenu === "banned" && (
          <BannedList loginer={loginer} reload={reload} />
        )}

        {selectedMenu === "current" && (
          <CurrentList
            loginer={loginer}
            chats={chats}
            setErrorMessage={setErrorMessage}
            reload={reload}
          />
        )}

        <Link
			to="/channels/new"
          className="mt-10 h-16 rounded text-center bg-blue-500 py-4 px-4 font-bold text-white hover:bg-blue-700"
        >
          New channel
        </Link>
      </div>

      {rootEl !== null &&
        (errorMessage.length > 0 || portalEffect === true) &&
        createPortal(
          <div
            className={classNames(
              "absolute top-2/4 left-2/4 w-3/4 max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-red-300 p-4 text-center shadow-lg dark:bg-red-900 dark:text-white",
              { "animate-fadeOut opacity-0": portalEffect },
              { "opacity-1 animate-fadeIn": !portalEffect }
            )}
            onAnimationEnd={() => {
              if (portalEffect === true) {
                setErrorMessage("");
              }
              setPortalEffect(false);
            }}
          >
            <h2 className="text-2xl">Error</h2>
            <p className="pt-3">{errorMessage}</p>
            <button
              type="button"
              className="mx-auto mt-3 block rounded-lg bg-cyan-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => {
                setPortalEffect(true);
              }}
            >
              OKay
            </button>
          </div>,
          rootEl
        )}
    </>
  );
}
