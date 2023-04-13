import User from "./User";
import axios from "axios";
import React from "react";
import { UserDto } from "src/_shared_dto/user.dto";
import { UseLoginDto } from "../Log/dto/useLogin.dto";
import { FiUserPlus, FiClock } from "react-icons/fi";
import { UseChatDto } from "../Chat/dto/useChat.dto";
import { UseGameDto } from "../Game/dto/useGame.dto";

export default function PendingList({
  loginer,
  gamer,
  reload,
  doReload,
  chats,
}: {
  loginer: UseLoginDto;
  gamer: UseGameDto;
  reload: boolean;
  doReload: Function;
  chats: UseChatDto;
}) {
  const [usersRecv, setUsersRecv] = React.useState<UserDto[]>([]);
  const [usersSent, setUsersSent] = React.useState<UserDto[]>([]);

  const handlePending = (user: UserDto) => {
    axios
      .post(`/api/me/friends/${user.id}`, {}, loginer.get_headers())
      .then((res) => {
        if (res.status === 201) {
          doReload();
          return;
        }
      })
      .catch((error) => {});
  };

  React.useEffect(() => {
    axios
      .get("/api/me/friends/received", loginer.get_headers())
      .then((res) => {
        if (res.status === 200 && res.data) {
          setUsersRecv(res.data as UserDto[]);
          return;
        }
      })
      .catch((error) => {});
    axios
      .get("/api/me/friends/sent", loginer.get_headers())
      .then((res) => {
        if (res.status === 200 && res.data) {
          setUsersSent(res.data as UserDto[]);
          return;
        }
      })
      .catch((error) => {});
  }, [reload, loginer]);

  let content: JSX.Element[] = usersRecv.map((user) => (
    <li className="flex items-center" key={user.id}>
      <User
        chats={chats}
        type={"ask"}
        loginer={loginer}
        gamer={gamer}
        user={user}
        doReload={doReload}
      >
        <FiUserPlus
          onClick={() => handlePending(user)}
          className="mr-1 inline-block cursor-pointer"
        />
      </User>
    </li>
  ));

  content = content.concat(
    usersSent.map((user) => (
      <li className="flex items-center" key={user.id}>
        <User
          chats={chats}
          type={"sent"}
          loginer={loginer}
          gamer={gamer}
          user={user}
          doReload={doReload}
        >
          <FiClock
            // onClick={() => handlePending(user)}
            className="mr-1 inline-block cursor-pointer"
          />
        </User>
      </li>
    ))
  );

  return (
    <>
      {content.length > 0 && (
        <>
          <h2 className="text-2xl">Pending list</h2>
          <ul className="mb-4 pl-1">{content}</ul>
        </>
      )}
    </>
  );
}
