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
import ChannelsPage from "./components/channels/ChannelsPage";
import FriendsPage from "./components/Friends/FriendsPage";
import { UseChatDto } from "./components/Chat/dto/useChat.dto";
import { UseGameDto } from "./components/Game/dto/useGame.dto";
import useChat from "./components/Chat/useChat";
import useGame from "./components/Game/useGame";

export default function App() {
  const loginer: UseLoginDto = useLogin();
  const [openedMenu, setOpenedMenu] = React.useState("");

  let chats: UseChatDto = useChat({
    logged: loginer.logged,
    token: loginer.token,
  });
  let gamer: UseGameDto = useGame({
    logged: loginer.logged,
    token: loginer.token,
  });

  return (
    <Router>
      <NavBar
        loginer={loginer}
        openedMenu={openedMenu}
        setOpenedMenu={setOpenedMenu}
      />

      <div className="grow bg-gray-100 dark:bg-gray-400">
        <Routes>
          <Route path="/" element={<HomePage />} />

          {loginer.logged && (
            <>
              <Route
                path="/profile"
                element={<SettingsPage loginer={loginer} />}
              />
              <Route path="/friends" element={<FriendsPage />} />
			  <Route
                path="/channels"
                element={<ChannelsPage loginer={loginer} />}
              />
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

      <ChatIcon openedMenu={openedMenu} setOpenedMenu={setOpenedMenu} />

      <ChatPage openedMenu={openedMenu} setOpenedMenu={setOpenedMenu} />
    </Router>
  );
}
