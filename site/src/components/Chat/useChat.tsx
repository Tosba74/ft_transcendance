
import React from 'react';
import { io, Socket } from 'socket.io-client';

import { ChatMessage } from './dto/chat-message.dto';
import { ChatResponse } from './dto/chat-response.dto';
import { ChatRoom } from './dto/chat-room.dto';

import { UseChatDto } from './dto/useChat.dto';





const useChat = (): UseChatDto => {

  // let socket: Socket = io('http://127.0.0.1:4000');
  const socketRef = React.useRef<Socket>();

  // const [messages, setMessages] = React.useState<{ [key: string]: ChatMessage[] }>();
  const [messages, setMessages] = React.useState<{ [key: number]: ChatMessage[] }>();

  let rooms: number[] = [1];
  const username: string = "default";


  React.useEffect(() => {
    setTimeout(() => {

      console.log('arrived');

      // socketRef.current = io('http://localhost:8080/');
      socketRef.current = io('http://localhost:8080/', {path: '/chat/'});
      // socketRef.current = io('http://localhost:8080', {path: '/api'});

      socketRef.current.on("connect", () => {
        console.log("connected! front-end");

        // rooms.forEach(function (oneRoom) {
        //   joinRoom(oneRoom);

        // });


        interface broadcastMessageProps {
          room: number,
          message: ChatMessage,
        }

        // console.log(socketRef.current);
        socketRef.current &&
          socketRef.current.on("broadcastMessage", ({ room, message }: broadcastMessageProps) => {

            // console.log("broacd", messages);
            console.log("recv", room, message);

            let newMsgList: ChatMessage[] = (messages && messages[room]) || [];
            newMsgList.push(message);

            // console.log("oneroom", newMsgList);

            setMessages((oldMessages) => ({
              ...oldMessages,
              [room]: [...((oldMessages && oldMessages[room]) || []), message],
            }));


            // console.log("after", messages);
          });

      });
    }, 1000);
  }, []);


  const identify = (room_id: number) => {

    socketRef.current &&
      socketRef.current.emit("identify", {}, (response: ChatResponse<undefined>) => {

        if (response.error != undefined) {
          console.log('identify error', response.error)

        }
      });
  }

  const connectRoom = (room_id: number) => {

    socketRef.current &&
      socketRef.current.emit("joinRoom", { room: room_id }, (response: ChatResponse<ChatRoom>) => {

        if (response.error != undefined) {
          let roomName: string = response.value?.name || "";
          let roomMessages = response.value?.messages || [];


          if (roomName != "") {
            setMessages(oldMessages => ({
              ...oldMessages,
              [roomName]: roomMessages,
            }));
          }
        }

        // console.log(messages);
      });
  }


  const sendMessage = (messageBody: string, room: number) => {

    socketRef.current &&
      socketRef.current.emit('createMessage', {
        room: room,
        message: messageBody,
      });
  };


  return { messages, identify, connectRoom, sendMessage }
}

export default useChat;