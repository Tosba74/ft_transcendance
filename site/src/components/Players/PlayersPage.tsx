import axios from "axios";
import React from "react";

import { UserDto } from "src/_shared_dto/user.dto";
import { UseChatDto } from "../Chat/dto/useChat.dto";
import { UseLoginDto } from "../Log/dto/useLogin.dto";
import UserCard from "./PlayerCard";

interface PlayersPageProps {
  loginer: UseLoginDto;
  chats: UseChatDto;
  //   refreshUserInfos: Function;
}

export default function PlayersPage({ loginer, chats }: PlayersPageProps) {
  let [users, setUsers] = React.useState<UserDto[]>([]);

  React.useEffect(() => {
    axios
      .get("/api/users", loginer.get_headers())
      .then((res) => {
        if (res.status === 200) {
          setUsers(res.data as UserDto[]);

          return;
        }
      })
      .catch((error) => {});
  }, [loginer]);

  // React.useEffect(() => {
  //   axios
  //     .get("/api/me/friends", loginer.get_headers())
  //     .then((res) => {
  //       if (res.status === 200) {
  //         console.log(res.data);
  //         // setUsers(res.data as UserDto[]);

  //         return;
  //       }
  //     })
  //     .catch((error) => {});
  // }, []);

  return (
    <>
      <div className="h-full w-full justify-center p-2">
        <div className="mx-auto flex flex-wrap justify-center gap-2">
          {users.map((user) => (
            <div key={user.id}>
              <UserCard loginer={loginer} chats={chats} user={user} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
