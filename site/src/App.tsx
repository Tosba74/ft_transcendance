import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import axios from 'axios';

import './App.css';

import ReactPage from './components/ReactPage';
import GamePage from './components/Game/GamePage';
import HomePage from './components/Home/HomePage';
import ProfilePage from './components/Profile/ProfilePage';
import Profil from './components/Profil';
import LogPage from './components/Log/LogPage';

import NavBar from './components/NavBar/NavBar';
import ChatIcon from './components/Chat/ChatIcon';
import ExempleChat from './components/Chat/exemple';

import LoginApi from './components/Log/LoginApi';
import Logout from './components/Log/Logout';

// import useChat from './components/Chat/useChat';
import { UseChatDto } from './components/Chat/dto/useChat.dto';
import { ChatMessage } from './components/Chat/dto/chat-message.dto';


import { io, Socket } from 'socket.io-client';
import { ChatResponse } from './components/Chat/dto/chat-response.dto';
import { ChatRoom } from './components/Chat/dto/chat-room.dto';
import useChat from './components/Chat/useChat';


export default function App() {
  const [logged, setLogged] = useState(false);
  const [userInfos, setUserInfos] = useState({});

  let chats: UseChatDto = useChat();


  // const [chats, setChat] = useState({});




  /*const socketRef = React.useRef<Socket>();

  // const [messages, setMessages] = React.useState<{ [key: string]: ChatMessage[] }>();
  const [messages, setMessages] = React.useState<{ [key: number]: ChatMessage[] }>();

  let rooms: number[] = [1];
  const username: string = "default";


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
*/







  useEffect(() => {

    console.log('effect');

    // setChat();

    // console.log('login try');



    // console.log('arrived');

    /*socketRef.current = io('ws://localhost:4000');

    socketRef.current.on("connect", () => {
      console.log("connected! front-end");

      // rooms.forEach(function (oneRoom) {
      //   joinRoom(oneRoom);

      // });


      interface broadcastMessageProps {
        room: number,
        message: ChatMessage,
      }

      socketRef.current &&
        socketRef.current.on("broadcastMessage", ({ room, message }: broadcastMessageProps) => {

          console.log("broacd", messages);
          console.log("recv", room, message);

          let newMsgList: ChatMessage[] = (messages && messages[room]) || [];
          newMsgList.push(message);

          // console.log("oneroom", newMsgList);

          setMessages((oldMessages) => ({
            ...oldMessages,
            [room]: [...((oldMessages && oldMessages[room]) || []), message],
          }));


          console.log("after", messages);
        });

    });*/

    async function fetchData() {

      try {
        const token = localStorage.getItem('token');

        if (token != null) {
          axios.get('/api/me',
            {
              headers: ({
                Authorization: 'Bearer ' + token,
              })
            })
            .then(res => {
              if (res.status === 200) {

                console.log(res.data);
                setUserInfos(res.data);
                setLogged(true);

                chats.identify();


                return;
              }
            })
            .catch(error => {
            });
        }
      }
      catch {
      }


      setLogged(false)
    }

    fetchData();
  }, [setLogged]);

  return (
    <Router>
      <div>
        <NavBar logged={logged} />
        <div className="bg-gray-100 dark:bg-gray-400">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/players" element={<ProfilePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/exemplechat" element={<ExempleChat identify={chats.identify} />} />
            {/* <Route path="/profil" element={<Profil />} /> */}
            <Route path="/history" element={<ReactPage />} />
            <Route path="/login" element={<LogPage setLogged={setLogged} />} />
            <Route path="/loginapi" element={<LoginApi setLogged={setLogged} />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
        <div className="absolute z-50 right-0 bottom-8">
          <ChatIcon />
        </div>

      </div>
    </Router>
  );
}
