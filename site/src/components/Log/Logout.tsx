import React from "react";
import { useNavigate } from "react-router-dom";

import { UseChatDto } from "../Chat/dto/useChat.dto";
import { UseGameDto } from "../Game/dto/useGame.dto";
import { UseLoginDto } from "./dto/useLogin.dto";

interface LogoutProps {
  loginer: UseLoginDto;
  chats: UseChatDto;
  gamer: UseGameDto;
}

export default function Logout({ loginer, chats, gamer }: LogoutProps) {
  const [pageMessage, setPageMessage] = React.useState("Logout");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loginer.token !== undefined && loginer.token !== "") {
      localStorage.clear();
      chats.deco();
      gamer.deco();

      loginer.setToken(localStorage.getItem("token") || "");
    } //
    else {
      setPageMessage("Logout successful, redirecting...");
      loginer.getUserData();

      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [loginer.token, chats, gamer, loginer, navigate]);

  return <div className="mt-3 h-6 text-center text-sm">{pageMessage}</div>;
}
