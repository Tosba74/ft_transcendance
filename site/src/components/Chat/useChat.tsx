
import React from 'react';
import { io, Socket } from 'socket.io-client';

import { ChatMessage } from './dto/chat-message.dto';
import { ChatResponse } from './dto/chat-response.dto';
import { ChatRoom } from './dto/chat-room.dto';

import { UseChatDto } from './dto/useChat.dto';


interface useChatProps {
  logged: boolean;
  token: string;
}

interface broadcastMessageProps {
  room_id: string,
  message: ChatMessage,
}

const useChat = ({logged, token}: useChatProps): UseChatDto => {

  const socketRef = React.useRef<Socket>();
  const [rooms, setRooms] = React.useState<{ [key: string]: ChatRoom }>();


  const identify = () => {

    console.log('sent iden');

    // Send identify to register websocket user
    socketRef.current &&
      socketRef.current.emit("identify", {}, (response: ChatResponse<ChatRoom[]>) => {

        if (response.error != undefined) {
          console.log('identify error', response.error)

        }
      });
  }


  const connectRoom = (room_id: number) => {

    console.log('try connect', room_id);

    // Try to connect to a room, receive room name and messages on success
    socketRef.current &&
      socketRef.current.emit("connectRoom", { room: room_id }, (response: ChatResponse<ChatRoom>) => {

        if (response.error == undefined && response.value) {
          let room: ChatRoom = response.value;

          console.log('connected', room.id);

          setRooms(oldRooms => ({
            ...oldRooms,
            [room.id]: room,
          }));
        }

      });
  }


  const sendMessage = (messageBody: string, room_id: number) => {

    socketRef.current &&
      socketRef.current.emit('createMessage', {
        room_id: room_id,
        message: messageBody,
      });
  };




  React.useEffect(() => {

    if (logged && socketRef.current === undefined) {

      socketRef.current = io('http://localhost:8080/', {
        path: '/chat/',
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
          socketRef.current.on("broadcastMessage", ({ room_id, message }: broadcastMessageProps) => {

            console.log('recv msg', room_id, message);
            
            setRooms((oldRooms) => ((oldRooms && oldRooms[room_id] && {
              ...oldRooms,
              [room_id]: {...(oldRooms[room_id]), messages: [...oldRooms[room_id].messages, message]} ,
            })) || oldRooms);
          });
      });

    }
    else {
      console.log('socket not connected not logged');
    }

  }, [logged]);



  return { rooms, identify, connectRoom, sendMessage }
}

export default useChat;