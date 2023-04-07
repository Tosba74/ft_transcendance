import React from "react";
import classNames from "classnames";
import { createPortal } from "react-dom";

import PublicList from "./PublicList";
import BannedList from "./BannedList";
import CurrentList from "./CurrentList";

import { UseLoginDto } from "../Log/dto/useLogin.dto";
import { UseChatDto } from "../Chat/dto/useChat.dto";

interface ChannelsPageProps {
  loginer: UseLoginDto;
  chats: UseChatDto;
}

export default function ChannelsPage({ loginer, chats }: ChannelsPageProps) {
  const rootEl = document.getElementById("root");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [portalEffect, setPortalEffect] = React.useState(false);
  const [reload, setReload] = React.useState(false);

  function doReload() {
    setReload((old) => !old);
  }

  //
  return (
    <div className="mx-auto max-w-md">
      <div className="flex flex-col px-4">
        <PublicList
          loginer={loginer}
          setErrorMessage={setErrorMessage}
          reload={reload}
          doReload={doReload}
        />
        <BannedList loginer={loginer} reload={reload} />
        <CurrentList
          loginer={loginer}
          chats={chats}
          setErrorMessage={setErrorMessage}
          reload={reload}
        />
        <button
          className="mt-16 h-16 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          type="button"
          id="btn_new"
          onClick={() => {
            console.log(`button open pressed`);
          }}
        >
          New channel
        </button>
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
    </div>
  );
}
