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

import useChat from './components/Chat/useChat';
import { UseChatDto } from './components/Chat/dto/useChat.dto';


export default function App() {
  const [logged, setLogged] = useState(false);
  const [userInfos, setUserInfos] = useState({});

  const [token, setToken] = useState(localStorage.getItem('token') || '');

  
  let chats: UseChatDto = useChat({logged, token});

  useEffect(() => {
    
    console.log('effect');
    
    async function fetchData() {
      
      try {
        
        if (token != '') {
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
                                
                return;
              }
            })
            .catch(error => {
            });
          }
        }
        catch {
        }
        
        
        setLogged(false);
      }
      
    fetchData();
      
  }, [token]);

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
            <Route path="/exemplechat" element={<ExempleChat chats={chats} />} />
            {/* <Route path="/profil" element={<Profil />} /> */}
            <Route path="/history" element={<ReactPage />} />
            <Route path="/login" element={<LogPage setToken={setToken} />} />
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
