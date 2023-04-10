import ChatBulleRecv from "./MessageBulleRecv";
import ChatBulleSend from "./MessageBulleSend";

import UserList from "./ChannelUserList";
import { useState } from "react";

import MessageConv from "./MessagePanel";
import MessageInput from "./MessageInput";
import ChannelPanel from "./ChannelPanel";
import ChatMode from "./ChatMode";
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
        <div className="absolute top-16 bottom-10 z-50 flex w-full flex-col rounded-lg bg-gray-300 p-2 shadow-lg dark:bg-gray-800 md:top-20 md:right-2 md:w-1/2 lg:top-20 lg:w-1/3">
          <div className="flex flex-row items-center justify-between rounded bg-gray-200 p-2 text-center shadow-lg dark:bg-gray-700 dark:text-white">
            <ChatMode
              handleClick={handleClick}
              setOpenedMenu={setOpenedMenu}
              modeChannel={modeChannel}
            />
          </div>

          <div className="right-2 left-2 flex h-0 w-full flex-grow flex-col rounded">
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
