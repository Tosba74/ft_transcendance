import ChatBulleRecv from "./ChatBulleRecv";
import ChatBulleSend from "./ChatBulleSend";

import UserList from "./UserList";
import { useState } from "react";
import { Channel } from "./Channel";
import { Mock_Channel } from "./Mock_Channel";

export default function ChatPage({ shutUp }: { shutUp: Function }) {
  const [channels] = useState<Channel[]>(Mock_Channel);
  const [currChannel, setCurrChannel] = useState(0);
  const [isMode, setMode] = useState(false);

  const handleClick = () => {
    setMode(!isMode);
  };

  return (
    <div className="h-full lg:w-1/3 flex flex-col p-2 bg-gray-300 dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="w-full flex flex-row justify-between items-center shadow-lg dark:bg-gray-700 dark:text-white bg-gray-200 p-2 text-center rounded">
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
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="h-full bg-gray-200 dark:bg-gray-700 dark:text-white mt-2 shadow-lg rounded overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
        {!isMode && (
          <div>
            <ChatBulleRecv />
            <ChatBulleRecv />
            <ChatBulleSend />
            <ChatBulleRecv />
            <ChatBulleSend />
            <ChatBulleSend />
          </div>
        )}
        {isMode && (
          <div>
            <UserList lstChannel={channels} setCurrChannel={setCurrChannel} />
          </div>
        )}
      </div>
    </div>
  );
}
