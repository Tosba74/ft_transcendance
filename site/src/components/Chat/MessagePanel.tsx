import { ChatRoomDto } from "src/_shared_dto/chat-room.dto";
import { UseLoginDto } from "../Log/dto/useLogin.dto";
import MessageConv from "./MessageConv";
import MessageInput from "./MessageInput";
import { UseChatDto } from "./dto/useChat.dto";
import { UseGameDto } from "../Game/dto/useGame.dto";
import React from "react";

interface MessagePanelProps {
  selfId: number;
  sendMessage: Function;
  room: ChatRoomDto | undefined;
  loginer: UseLoginDto;
  chats: UseChatDto;
  gamer: UseGameDto;
}

export default function MessagePanel({
  selfId,
  sendMessage,
  room,
  loginer,
  chats,
  gamer,
}: MessagePanelProps) {
  const [role, setRole] = React.useState("");

  React.useEffect(() => {
    const me = room?.participants.find(
      (participant) => participant.id === selfId
    );
    if (me !== undefined) {
      if (me.roleId > 1) setRole(` ${me.roleName}`);
    }
  }, [room, selfId]);

  return (
    <>
      <div className="mt-2 grid h-10 w-full grid-cols-1 items-center justify-center rounded-t bg-gray-200 text-center dark:bg-gray-700 dark:text-white">
        <div className="mr-2 items-center justify-center overflow-x-hidden whitespace-nowrap">
          {room?.name || "No room selected"} <small>{role}</small>
        </div>
        <div className="content=[' '] mx-auto w-[80%] border-t border-black dark:border-gray-100"></div>
      </div>
      <div
        id="chat"
        className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch mb-2 h-0 flex-grow overflow-y-scroll rounded-b bg-gray-200 shadow-lg dark:bg-gray-700 dark:text-white"
      >
        <MessageConv
          loginer={loginer}
          chats={chats}
          gamer={gamer}
          selfId={selfId}
          messages={room?.messages || []}
        />
      </div>
      <MessageInput sendMessage={sendMessage} />
    </>
  );
}
