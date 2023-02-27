import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import axios from 'axios';

import './App.css';

import ReactPage from './components/ReactPage';
import GamePage from './components/Game/GamePage';
import HomePage from './components/Home/HomePage';
import ProfilePage from './components/Profile/ProfilePage';
import LogPage from './components/Profile/LogPage';
import NavBar from './components/NavBar';
import LoginApi from './components/Profile/LoginApi';
import Logout from './components/Profile/Logout';


export default function App() {
  const [logged, setLogged] = React.useState(false);
  const [userInfos, setUserInfos] = React.useState({});

  React.useEffect(() => {
    console.log('login try');

    async function fetchData() {

      try {
        const token = localStorage.getItem('token');

        if (token != null) {
          axios.get('/api/login/profile',
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


      setLogged(false)
    }

    fetchData();
  }, [setLogged]);

  return (
    <Router>
      <div className="bg_white">
        <NavBar logged={logged} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/players" element={<ProfilePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/history" element={<ReactPage />} />
          <Route path="/login" element={<LogPage setLogged={setLogged} />} />
          <Route path="/loginapi" element={<LoginApi setLogged={setLogged} />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
}
