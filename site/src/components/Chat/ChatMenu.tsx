import ChannelPanel from "./ChannelPanel";
import ChatMode from "./ChatMode";
import MessagePanel from "./MessagePanel";
import { UseChatDto } from "./dto/useChat.dto";
import { UseLoginDto } from "../Log/dto/useLogin.dto";
import classNames from "classnames";
import { UseGameDto } from "../Game/dto/useGame.dto";
import React from "react";

interface ChatMenuProps {
  openedMenu: string;
  setOpenedMenu: Function;
  loginer: UseLoginDto;
  chats: UseChatDto;
  gamer: UseGameDto;
}

export default function ChatMenu({
  openedMenu,
  setOpenedMenu,
  loginer,
  chats,
  gamer,
}: ChatMenuProps) {
  const [animation, setAnimation] = React.useState(true);

  const sendMessage = (text: string) => {
    chats.sendMessage(text, chats.currChannel);
  };

  const handleAnimation = () => {
    setAnimation(!animation);
  };

  return (
    <>
      {chats.chatOpen && (
        <div
          id="innerChat"
          dir="rtl"
          className={classNames(
            animation
              ? "animate-slideInChat"
              : "animate-slideOutChat opacity-0",
            "sm:resize-x sm:overflow-x-auto sm:overflow-y-hidden",
            "absolute top-20 bottom-10 z-40 flex w-full min-w-full max-w-[98%] flex-col rounded-lg bg-gray-300 p-2 shadow-lg dark:bg-gray-800 sm:right-2 sm:min-w-[325px] md:top-20 md:w-1/2 lg:top-20 lg:w-1/3"
          )}
          onAnimationEnd={() => {
            if (!animation) {
              chats.setChatOpen("");
              setAnimation(true);
            }
          }}
        >
          <div
            dir="ltr"
            className="flex flex-row items-center justify-between rounded bg-gray-200 p-2 text-center shadow-lg dark:bg-gray-700 dark:text-white"
          >
            <ChatMode
              chats={chats}
              setOpenedMenu={setOpenedMenu}
              handleAnimation={handleAnimation}
              modeChannel={chats.modeChannel}
            />
          </div>
          <div
            dir="ltr"
            className="right-2 left-2 flex h-0 w-full flex-grow flex-col rounded"
          >
            {!chats.modeChannel && (
              <MessagePanel
                selfId={loginer.userInfos?.id || -1}
                sendMessage={sendMessage}
                room={chats.rooms && chats.rooms[chats.currChannel.toString()]}
                loginer={loginer}
                chats={chats}
                gamer={gamer}
              />
            )}
            {chats.modeChannel && <ChannelPanel chats={chats} />}
          </div>
        </div>
      )}
    </>
  );
}
