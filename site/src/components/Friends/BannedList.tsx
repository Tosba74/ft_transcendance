import User from "./User";
import React from "react";
import axios from "axios";
import { FiUserX } from "react-icons/fi";
import { UserDto } from "src/_shared_dto/user.dto";
import { UseLoginDto } from "../Log/dto/useLogin.dto";
import { UseChatDto } from "../Chat/dto/useChat.dto";
import { UseGameDto } from "../Game/dto/useGame.dto";

export default function BannedList({
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
  const [users, setUsers] = React.useState<UserDto[]>([]);

  const handleUnblock = (user: UserDto) => {
    axios
      .delete(`/api/me/blockeds/${user.id}`, loginer.get_headers())
      .then((res) => {
        if (res.status === 204) {
          doReload();
          return;
        }
      })
      .catch((error) => {});
  };

  React.useEffect(() => {
    axios
      .get("/api/me/blockeds", loginer.get_headers())
      .then((res) => {
        if (res.status === 200) {
          setUsers(res.data as UserDto[]);

          return;
        }
      })
      .catch((error) => {});
  }, [reload, loginer]);

  const content: JSX.Element[] = users.map((user) => (
    <li className="flex items-center text-slate-500" key={user.id}>
      <User
        chats={chats}
        gamer={gamer}
        type={"ban"}
        loginer={loginer}
        user={user}
        doReload={doReload}
      >
        <FiUserX
          onClick={() => handleUnblock(user)}
          className="mr-1 inline-block cursor-pointer text-black dark:text-white"
        />
      </User>
    </li>
  ));

  return (
    <>
      {content.length > 0 && (
        <>
          <h2 className="text-2xl">Banned list</h2>
          <ul className="mb-4 pl-1">{content}</ul>
        </>
      )}
    </>
  );
}
