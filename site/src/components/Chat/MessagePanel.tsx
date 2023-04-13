import { ChatRoomDto } from "src/_shared_dto/chat-room.dto";
import { UseLoginDto } from "../Log/dto/useLogin.dto";
import MessageConv from "./MessageConv";
import MessageInput from "./MessageInput";
import React from "react";
import { ParticipantDto } from "src/_shared_dto/participant.dto";
import OwnerCommands from "./OwnerCommands";

interface MessagePanelProps {
  loginer: UseLoginDto;
  selfId: number;
  sendMessage: Function;
  room: ChatRoomDto | undefined;
}

export default function MessagePanel({
  loginer,
  selfId,
  sendMessage,
  room,
}: MessagePanelProps) {
  const [role, setRole] = React.useState("");

  React.useEffect(() => {
    const me = room?.participants.find(
      (participant) => participant.id === selfId
    );
    if (me !== undefined) {
      if (me.roleId > 1) setRole(me.roleName);
    }
  }, [room]);

  return (
    <>
      <div className="mt-2 flex h-10 w-full items-center justify-center rounded-t bg-gray-200 text-center dark:bg-gray-700 dark:text-white">
        <div className="shadow-b mr-2 h-8 items-center justify-center overflow-x-hidden whitespace-nowrap border-b border-gray-900 px-20">
          {room?.name || "No room selected"}
          {(role === "owner" && (
            <OwnerCommands
              loginer={loginer}
              sendMessage={sendMessage}
              participants={room?.participants || []}
              role={role}
              room={room}
            />
          )) || <small className="pl-1"> {role}</small>}
        </div>
      </div>
      <div className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch mb-2 h-0 flex-grow overflow-y-scroll rounded-b bg-gray-200 shadow-lg dark:bg-gray-700 dark:text-white">
        <MessageConv
          loginer={loginer}
          selfId={selfId}
          messages={room?.messages || []}
        />
      </div>
      <MessageInput sendMessage={sendMessage} />
    </>
  );
}
