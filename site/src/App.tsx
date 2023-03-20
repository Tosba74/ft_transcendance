import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import './App.css';

import ReactPage from './components/ReactPage';
import GamePage from './components/Game/GamePage';
import HomePage from './components/Home/HomePage';
import ProfilePage from './components/Profile/ProfilePage';
import LogPage from './components/Profile/LogPage';

import NavBar from './components/NavBar/NavBar';
import ChatPage from './components/Chat/ChatPage';

import LoginApi from './components/Profile/LoginApi';
import Logout from './components/Profile/Logout';

import axios from 'axios';
import {LoggedUser} from './components/Profile/LoggedUser';
import jwt_decode from "jwt-decode";

// Voir aussi pour verifier si le token est toujours valable
// si non setLogged a false + setUserInfos a {}

export default function App() {
  const [logged, setLogged] = React.useState(false);
  const [userInfos, setUserInfos] = React.useState(new LoggedUser());

  function fetchData() {
    try {
      const token = localStorage.getItem('token');
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

  useEffect(fetchData, [logged]);

  return (
    <Router>
      <div className="bg_white">
        <NavBar logged={logged} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/players" element={<ProfilePage user={userInfos} setUserInfos={setUserInfos} />} />
          <Route path="/profile" element={<ProfilePage user={userInfos} setUserInfos={setUserInfos} />} />
          <Route path="/profile/:id" element={<ProfilePage user={userInfos} setUserInfos={setUserInfos} />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/chat" element={<ChatPage/>} />
          <Route path="/history" element={<ReactPage />} />
          <Route path="/login" element={<LogPage setLogged={setLogged} />} />
          <Route path="/loginapi" element={<LoginApi setLogged={setLogged} />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
}
