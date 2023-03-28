import ChatBulleRecv from "./ChatBulleRecv";
import ChatBulleSend from "./ChatBulleSend";

import UserList from "./UserList";
import { useState } from "react";
import { Channel } from "./Channel";
import { Mock_Channel } from "./Mock_Channel";
import ChatChannel from "./ChatChannel";

interface ChatPageProps {
  shutUp: Function;
  changeMode: Function;
}

export default function ChatPage({ shutUp, changeMode }: ChatPageProps) {
  const [channels] = useState<Channel[]>(Mock_Channel);
  const [currChannel, setCurrChannel] = useState(0);
  const [isMode, setMode] = useState(false);

  const handleClick = () => {
    setMode(!isMode);
  };

  return (
    <div className="flex h-full flex-col rounded-lg bg-gray-300 p-2 shadow-lg dark:bg-gray-800 lg:w-1/3">
      <div className="flex w-full flex-row items-center justify-between rounded bg-gray-200 p-2 text-center shadow-lg dark:bg-gray-700 dark:text-white">
        <button
          className="w-full text-center"
          type="button"
          onClick={handleClick}
        >
          {isMode && <div className="px-4">Channel List</div>}
          {!isMode && <div className="px-4">Chat Mode</div>}
        </button>
        <button className="w-10" type="button" onClick={() => shutUp()}>
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
      <div className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch mt-2 h-full overflow-y-auto rounded bg-gray-200 shadow-lg dark:bg-gray-700 dark:text-white">
        {!isMode && (
          <div>
            <ChatChannel chan={channels[currChannel]} />
          </div>
        )}
        {isMode && (
          <div>
            <UserList
              lstChannel={channels}
              setCurrChannel={setCurrChannel}
              mode={handleClick}
            />
          </div>
        )}
      </div>
    </div>
  );
}
