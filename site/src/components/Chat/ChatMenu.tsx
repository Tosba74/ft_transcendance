import ChatBulleRecv from "./MessageBulleRecv";
import ChatBulleSend from "./MessageBulleSend";

import UserList from "./ChannelUserList";
import { useState } from "react";
import { Channel } from "./Channel";
import { Mock_Channel } from "./Mock_Channel";
import MessageConv from "./MessagePanel";
import MessageInput from "./MessageInput";
import ChannelPanel from "./ChannelPanel";
import MessagePanel from "./MessagePanel";

interface ChatMenuProps {
  openedMenu: string;
  setOpenedMenu: Function;
}

export default function ChatMenu({ openedMenu, setOpenedMenu }: ChatMenuProps) {
  const [currChannel, setCurrChannel] = useState("");

  const [modeChannel, setModeChannel] = useState(false);

  const handleClick = () => {
    setModeChannel(!modeChannel);
  };

  return (
    <>
      {openedMenu == "chat" && (
        <div className="absolute top-20 bottom-10 right-5 left-5 z-50 ml-auto flex flex-col rounded-lg bg-gray-300 p-2 shadow-lg dark:bg-gray-800 lg:w-1/3">
          <div className="flex flex-row items-center justify-between rounded bg-gray-200 p-2 text-center shadow-lg dark:bg-gray-700 dark:text-white">
            <button
              className="w-full text-center"
              type="button"
              onClick={handleClick}
            >
              {modeChannel && <div className="px-4">Channel List</div>}
              {!modeChannel && <div className="px-4">Chat Modffsdde</div>}
            </button>
            <button
              className="w-10"
              type="button"
              onClick={() => setOpenedMenu("")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-grow flex-col rounded">
            {!modeChannel && <MessagePanel />}
            {modeChannel && <ChannelPanel setChannel={setCurrChannel} />}
          </div>
        </div>
      )}
    </>
  );
}
