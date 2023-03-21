import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

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

import useChat from './components/Chat/useChat';
import { UseChatDto } from './components/Chat/dto/useChat.dto';

import axios from 'axios';
import { LoggedUser } from './components/Profile/LoggedUser';
import jwt_decode from "jwt-decode";


export default function App() {
  const [logged, setLogged] = React.useState(false);
  const [userInfos, setUserInfos] = React.useState(new LoggedUser());

  const [token, setToken] = useState(localStorage.getItem('token') || '');


  let chats: UseChatDto = useChat({ logged, token });

  function fetchData() {
    try {
      if (token != null) {
        const user: LoggedUser = jwt_decode(token);
        setUserInfos(user);
        setLogged(true);

        return;

        // axios.get('/api/me',
        //   {
        //     headers: ({
        //       Authorization: 'Bearer ' + token,
        //     })
        //   })
        //   .then(res => {
        //     if (res.status === 200) {
        //       // console.log(res.data);
        //       setUserInfos(res.data);
        //       setLogged(true);
        //       return;
        //     }
        //   })
        //   .catch(error => {
        //   });

      }
    } catch {

    }

    setLogged(false)
  }


  useEffect(fetchData, [token]);


  // const [tokenMessage, setTokenMessage] = React.useState('');

  // Voir aussi pour verifier si le token est toujours valable
  // si non setLogged a false + setUserInfos a {}
  function refreshTokenAndUserInfos() {
    const token = localStorage.getItem('token');

    // if token still available
        axios.get("/api/login/refresh_token", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(res => {
            const newtoken: string = res.data['access_token'];
            if (newtoken) {
                localStorage.setItem('token', newtoken);
                const user: LoggedUser = jwt_decode(newtoken);
                setUserInfos(user);
            }
        })
        .catch((error) => {
            // setTokenMessage('Error while refreshing user\'s token');
            console.log(error);
        });
    // else
        // log out the user
  }

  return (
    <Router>
      <div>
        <NavBar logged={logged} />
        <div className="bg-gray-100 dark:bg-gray-400">
          <Routes>
            <Route path="/" element={<HomePage />} />.
            <Route path="/players" element={<ProfilePage user={userInfos} refreshUserInfos={refreshTokenAndUserInfos} />} />
            <Route path="/profile" element={<ProfilePage user={userInfos} refreshUserInfos={refreshTokenAndUserInfos} />} />
            <Route path="/profile/:id" element={<ProfilePage user={userInfos} refreshUserInfos={refreshTokenAndUserInfos} />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/exemplechat" element={<ExempleChat chats={chats} />} />
            {/* <Route path="/profil" element={<Profil />} /> */}
            <Route path="/history" element={<ReactPage />} />
            <Route path="/login" element={<LogPage setLogged={setLogged} setToken={setToken} />} />
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
