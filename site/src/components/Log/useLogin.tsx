import axios from "axios";
import React from "react";
import { io, Socket } from "socket.io-client";
import { UserDto } from "src/_shared_dto/user.dto";
import { LoggedUserDto, UseLoginDto } from "./dto/useLogin.dto";

interface useChatProps {
  logged: boolean;
  token: string;
}

const useLogin = (): UseLoginDto => {
  const [logged, setLogged] = React.useState(false);
  const [userInfos, setUserInfos] = React.useState<LoggedUserDto | undefined>();

  const [token, setToken] = React.useState(localStorage.getItem("token") || "");

  let tfaUserId = React.useRef(-1);

  function get_headers(): any {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  function getUserData() {
    if (token && token.length != 0) {
      axios
        .get("/api/me", get_headers())
        .then((res) => {
          if (res.status === 200) {
            setLogged(true);
            setUserInfos(res.data as LoggedUserDto);
            return;
          }
        })
        .catch((error) => {});
    }
    setLogged(false);
    setUserInfos({} as LoggedUserDto);
  }

  React.useEffect(() => {
    if (logged == false) {
      getUserData();
    }
  }, [token]);

  // // Au moment du refresh verifier aussi d'abord si le token est toujours valable (pseudo code en dessous)
  // // si non: setLogged a false + setUserInfos a {}
  // function refreshTokenAndUserInfos() {
  //     const token = localStorage.getItem("token");

  //     // if token still available
  //     axios
  //         .get("/api/login/refresh_token", {
  //             headers: {
  //                 Authorization: `Bearer ${token}`,
  //             },
  //         })
  //         .then((res) => {
  //             const newtoken: string = res.data["access_token"];
  //             if (newtoken) {
  //                 localStorage.setItem("token", newtoken);
  //                 const user: LoggedUser = jwt_decode(newtoken);
  //                 setUserInfos(user);
  //             }
  //         })
  //         .catch((error) => {
  //             // setTokenMessage('Error while refreshing user\'s token');
  //             console.log(error);
  //         });
  //     // else
  //     // log out the user
  // }

  return {
    logged,
    setLogged,
    token,
    setToken,
    userInfos,
    get_headers,
    getUserData,
    tfaUserId,
  };
};

export default useLogin;
