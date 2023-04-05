import ChatBulleRecv from "./MessageBulleRecv";
import ChatBulleSend from "./MessageBulleSend";

import UserList from "./ChannelUserList";
import { useState } from "react";

import MessageConv from "./MessagePanel";
import MessageInput from "./MessageInput";
import ChannelPanel from "./ChannelPanel";
import MessagePanel from "./MessagePanel";
import { UseChatDto } from "./dto/useChat.dto";
import { UseLoginDto } from "../Log/dto/useLogin.dto";

interface ChatMenuProps {
  openedMenu: string;
  setOpenedMenu: Function;
  loginer: UseLoginDto;
  chats: UseChatDto;
}

export default function ChatMenu({
  openedMenu,
  setOpenedMenu,
  loginer,
  chats,
}: ChatMenuProps) {
  const [currChannel, setCurrChannel] = useState(0);

  const [modeChannel, setModeChannel] = useState(false);

  const handleClick = () => {
    setModeChannel(!modeChannel);
  };

  const sendMessage = (text: string) => {
    chats.sendMessage(text, currChannel);
  };

  return (
    <>
      {openedMenu == "chat" && (
        <div className="absolute top-16 bottom-10 z-50 flex w-full flex-col rounded-lg bg-gray-300 p-2 shadow-lg dark:bg-gray-800 md:top-20 lg:right-2 lg:top-20 lg:w-1/3">
          <div className="flex flex-row items-center justify-between rounded bg-gray-200 p-2 text-center shadow-lg dark:bg-gray-700 dark:text-white">
            <button
              className="w-full text-center"
              type="button"
              onClick={handleClick}
            >
              {modeChannel && <div className="px-4">Channel List</div>}
              {!modeChannel && <div className="px-4">Chat Mode</div>}
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

          <div className="right-2 left-2 flex w-full flex-grow flex-col rounded">
            {!modeChannel && (
              <MessagePanel
                selfId={loginer.userInfos?.id || -1}
                sendMessage={sendMessage}
                room={chats.rooms && chats.rooms[currChannel.toString()]}
              />
            )}
            {modeChannel && (
              <ChannelPanel
                currChannel={currChannel}
                setChannel={setCurrChannel}
                setModeChannel={setModeChannel}
                chats={chats}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
