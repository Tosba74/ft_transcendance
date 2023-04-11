import { ChatRoomDto } from "src/_shared_dto/chat-room.dto";
import MessageConv from "./MessageConv";
import MessageInput from "./MessageInput";
import React from "react";
import axios from "axios";

interface MessagePanelProps {
  selfId: number;
  sendMessage: Function;
  room: ChatRoomDto | undefined;
}

export default function MessagePanel({
  selfId,
  sendMessage,
  room,
}: MessagePanelProps) {

  const [role, setRole] = React.useState('test');
  const [token, setToken] = React.useState(localStorage.getItem("token") || "");

  React.useEffect(() => {
    axios
    .post('/api/chat_participant/role', {
      roomId: `${room?.id}`,
      participantId: `${selfId}`
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then((res) => {
      if (res.status === 201) {
        if (res.data === 2)
          setRole(' - Admin');
        else if (res.data === 3)
            setRole(' - Owner');
      }
    })
    .catch((error) => {});
  }, [room]);

  return (
    <>
      <div className="mt-2 flex h-10 w-full items-center justify-center rounded-t bg-gray-200 text-center dark:bg-gray-700 dark:text-white">
        <div className="shadow-b mr-2 h-8 items-center justify-center overflow-x-hidden border-b border-gray-900 px-20">
          {room?.name || "No room selected"} {role}
        </div>
      </div>
      <div className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch mb-2 h-0 flex-grow overflow-y-scroll rounded-b bg-gray-200 shadow-lg dark:bg-gray-700 dark:text-white">
        <MessageConv selfId={selfId} messages={room?.messages || []} />
      </div>
      <MessageInput sendMessage={sendMessage} />
    </>
  );
}
