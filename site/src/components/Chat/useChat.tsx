import React from "react";
import { io, Socket } from "socket.io-client";

import { ChatMessageDto } from "src/_shared_dto/chat-message.dto";
import { WsResponseDto } from "src/_shared_dto/ws-response.dto";
import { ChatRoomDto } from "src/_shared_dto/chat-room.dto";

import { UseChatDto } from "./dto/useChat.dto";
import { ParticipantDto } from "src/_shared_dto/participant.dto";

interface useChatProps {
  logged: boolean;
  token: string;
}

interface broadcastMessageProps {
  room_id: string;
  message: ChatMessageDto;
}

const useChat = ({ logged, token }: useChatProps): UseChatDto => {
  const socketRef = React.useRef<Socket>();
  const [rooms, setRooms] = React.useState<{ [key: string]: ChatRoomDto }>();

  const [chatOpen, setChatOpen] = React.useState(false);
  const [modeChannel, setModeChannel] = React.useState(false);
  const [currChannel, setCurrChannel] = React.useState(0);

  const identify = () => {
    console.log("sent iden chat");

    // Send identify to register websocket user
    socketRef.current &&
      socketRef.current.emit(
        "identify",
        {},
        (response: WsResponseDto<undefined>) => {
          if (response.error != undefined) {
            console.log("identify error", response.error);
          }

          // connectRoom(1);
          // connectRoom(2);
        }
      );
  };

  const connectRoom = (
    room_id: number,
    setError: Function | undefined = undefined
  ) => {
    console.log("try connect", room_id);

    // Try to connect to a room, receive room name and messages on success
    socketRef.current &&
      socketRef.current.emit(
        "connectRoom",
        { room: room_id },
        (response: WsResponseDto<ChatRoomDto>) => {
          if (response.error == undefined && response.value) {
            let room: ChatRoomDto = response.value;

            console.log("connected", room.id);

            setRooms((oldRooms) => ({
              ...oldRooms,
              [room.id]: room,
            }));

            setCurrChannel(room.id);
            setChatOpen(true);

            return true;
          } //
          else if (response.error !== undefined && setError !== undefined) {
            setError(response.error);
          }
        }
      );
  };

  const sendMessage = (messageBody: string, room_id: number) => {
    socketRef.current &&
      socketRef.current.emit("createMessage", {
        room_id: room_id,
        message: messageBody,
      });
  };

  const deco = () => {
    socketRef.current && socketRef.current.disconnect();

    socketRef.current = undefined;
  };

  React.useEffect(() => {
    if (logged && socketRef.current === undefined) {
      socketRef.current = io("", {
        path: "/socket-chat/",
        timeout: 10000,
        extraHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      socketRef.current.on("connect", () => {
        console.log("connected! front-end");

        // Send authorization header to authentify socket
        identify();

        // Bind function for message reception
        socketRef.current &&
          socketRef.current.on(
            "broadcastMessage",
            ({ room_id, message }: broadcastMessageProps) => {
              setRooms(
                (oldRooms) =>
                  (oldRooms &&
                    oldRooms[room_id] && {
                    ...oldRooms,
                    [room_id]: {
                      ...oldRooms[room_id],
                      messages: [...oldRooms[room_id].messages, message],
                    },
                  }) ||
                  oldRooms
              );
            }
          );

        socketRef.current &&
          socketRef.current.on(
            "updateParticipants",
            ({
              room_id,
              participants,
              pw,
            }: {
              room_id: number;
              participants: ParticipantDto[];
              pw: Boolean | undefined;
            }) => {
              console.log("recv udate");

              setRooms(
                (oldRooms) =>
                  (oldRooms &&
                    oldRooms[room_id] && {
                    ...oldRooms,
                    [room_id]: {
                      ...oldRooms[room_id],
                      participants: participants,
                      pw: pw,
                    },
                  }) ||
                  oldRooms
              );
            }
          );

        // socketRef.current &&
        // socketRef.current.on(
        //   "updatePassword",({})
        // );
      });
    } //
    else if (logged === false) {
      console.log("socket not connected not logged");
    }
  }, [logged]);

  return {
    rooms,
    chatOpen,
    setChatOpen,
    modeChannel,
    setModeChannel,
    currChannel,
    setCurrChannel,
    identify,
    connectRoom,
    sendMessage,
    deco,
  };
};

export default useChat;
