import React from 'react';
import './App.css';
import {BrowserRouter as Router,
  Routes, 
  Route,
  Link
} from "react-router-dom";
import ReactPage from './components/ReactPage';
import GamePage from './components/Game/GamePage';
import HomePage from './components/Home/HomePage';
import ProfilePage from './components/Profile/ProfilePage';
import LogPage from './components/Profile/LogPage';
import NavBar from './components/NavBar';

export default function App() {
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
          <Route path="/history" element={<ReactPage />} />
          <Route path="/login" element={<LogPage />} />
        </Routes>
      </div>
    </Router>
  );
}
