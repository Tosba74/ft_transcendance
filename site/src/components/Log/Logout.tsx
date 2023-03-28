import axios from "axios";
import React, { SyntheticEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UseLoginDto } from "./dto/useLogin.dto";

interface LogoutProps {
  loginer: UseLoginDto;
}

export default function Logout({ loginer }: LogoutProps) {
  const [pageMessage, setPageMessage] = React.useState("Logout");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loginer.token != undefined && loginer.token != "") {
      localStorage.clear();

      loginer.setToken(localStorage.getItem("token") || "");
    } else {
      setPageMessage("Logout successful, redirecting...");
      loginer.getUserData();

      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [loginer.token]);

  return <div className="mt-3 h-6 text-center text-sm">{pageMessage}</div>;
}
