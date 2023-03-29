import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import ReactPage from "./components/ReactPage";
import HomePage from "./components/Home/HomePage";
import ProfilePage from "./components/Settings/SettingsPage";
import LogPage from "./components/Log/LogPage";

import NavBar from "./components/NavBar/NavBar";
import ChatIcon from "./components/Chat/ChatIcon";

import LoginApi from "./components/Log/LoginApi";
import Logout from "./components/Log/Logout";

import SettingsPage from "./components/Settings/SettingsPage";
import { UseLoginDto } from "./components/Log/dto/useLogin.dto";
import useLogin from "./components/Log/useLogin";
import UserListPage from "./components/UserList/UserListPage";
import ChatPage from "./components/Chat/ChatMenu";
import GamePage from "./components/Game/GamePage";
import TfaCodePage from "./components/Log/TfaCodePage";
import CreateAccountPage from "./components/Log/CreateAccountPage";
import FriendsPage from "./components/Friends/FriendsPage";
import PublicProfilePage from "./components/PublicProfile/PublicProfilePage";
import { UseChatDto } from "./components/Chat/dto/useChat.dto";
import { UseGameDto } from "./components/Game/dto/useGame.dto";
import useChat from "./components/Chat/useChat";
import useGame from "./components/Game/useGame";

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


  // const [tokenMessage, setTokenMessage] = React.useState('');

  // Au moment du refresh verifier aussi d'abord si le token est toujours valable (pseudo code en dessous)
  // si non: setLogged a false + setUserInfos a {}
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
      <div className="bg_white">
        <NavBar logged={logged} />
        <Routes>
          <Route path="/" element={<HomePage />} />

          {loginer.logged && (
            <>
              <Route path="/players/:id"
                element={<PublicProfilePage player={loginer.userInfos} />}
              />
              <Route path="/friends" element={<FriendsPage />} />
              <Route
                path="/players"
                element={<UserListPage loginer={loginer} />}
              />
              <Route
                path="/settings"
                element={<SettingsPage loginer={loginer} />}
              />
              <Route path="/game" element={<GamePage gamer={gamer} />} />
              <Route path="/history" element={<ReactPage />} />
            </>
          )}
          <Route path="/login" element={<LogPage loginer={loginer} />} />
          <Route path="/loginapi" element={<LoginApi loginer={loginer} />} />
          <Route
            path="/login_tfa"
            element={<TfaCodePage loginer={loginer} />}
          />
          <Route path="/logout" element={<Logout loginer={loginer} />} />

          {process.env.BUILD_TYPE != "Production" && (
            <>
              <Route path="/createaccount" element={<CreateAccountPage />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}
