import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import './App.css';

import ReactPage from './components/ReactPage';
import GamePage from './components/Game/GamePage';
import HomePage from './components/Home/HomePage';
import ProfilePage from './components/Profile/ProfilePage';
import LogPage from './components/Profile/LogPage';
import NavBar from './components/NavBar/NavBar';
import ChatPage from './components/Chat/ChatPage';


export default function App () {
  return (
    <Router>
      <div className="bg_white">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/players" element={<ProfilePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/chat" element={<ChatPage/>} />
          <Route path="/history" element={<ReactPage />} />
          <Route path="/login" element={<LogPage />} />
        </Routes>
      </div>
    </Router>
  );
}
