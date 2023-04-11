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
import classNames from "classnames";

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
  // <<<<<<< HEAD
  // const [currChannel, setCurrChannel] = useState(0);
  // const [modeChannel, setModeChannel] = useState(false);
  // const [animation, setAnimation] = useState(true);

  // const handleClick = () => {
  //   setModeChannel(!modeChannel);
  // };

  const sendMessage = (text: string) => {
    chats.sendMessage(text, chats.currChannel);
  };

  // const handleAnimation = () => {
  //   setAnimation(!animation);
  // };

  return (
    <>
      {/* <<<<<<< HEAD
      {openedMenu === "chat" && (
        <div
          dir="rtl"
          className={classNames(
            "sm:resize-x sm:overflow-auto",
            animation
              ? "animate-slideInChat"
              : "animate-slideOutChat opacity-0",
            "absolute top-16 bottom-10 z-50 flex w-full max-w-[99%] flex-col rounded-lg bg-gray-300 p-2 shadow-lg dark:bg-gray-800 sm:min-w-[325px] md:top-20 md:right-2 md:w-1/2 lg:top-20 lg:w-1/3"
          )}
          onAnimationEnd={() => {
            console.log(animation);
            if (!animation) {
              setOpenedMenu();
              setAnimation(true);
            }
          }}
        >
          <div
            dir="ltr"
            className="flex flex-row items-center justify-between rounded bg-gray-200 p-2 text-center shadow-lg dark:bg-gray-700 dark:text-white"
          >
            <ChatMode
              handleClick={handleClick}
              handleAnimation={handleAnimation}
              modeChannel={modeChannel}
            />
          </div>

          <div
            dir="ltr"
            className="right-2 left-2 flex h-0 w-full flex-grow flex-col rounded"
          >
            {!modeChannel && ( */}
      {chats.chatOpen && (
        <div className="absolute top-16 bottom-10 z-50 flex w-full flex-col rounded-lg bg-gray-300 p-2 shadow-lg dark:bg-gray-800 md:top-20 md:right-2 md:w-1/2 lg:top-20 lg:w-1/3">
          <div className="flex flex-row items-center justify-between rounded bg-gray-200 p-2 text-center shadow-lg dark:bg-gray-700 dark:text-white">
            <ChatMode
              chats={chats}
              setOpenedMenu={setOpenedMenu}
              modeChannel={chats.modeChannel}
            />
          </div>
          <div className="right-2 left-2 flex h-0 w-full flex-grow flex-col rounded">
            {!chats.modeChannel && (
              <MessagePanel
                selfId={loginer.userInfos?.id || -1}
                sendMessage={sendMessage}
                room={chats.rooms && chats.rooms[chats.currChannel.toString()]}
              />
            )}
            {chats.modeChannel && <ChannelPanel chats={chats} />}
          </div>
        </div>
      )}
    </>
  );
}
