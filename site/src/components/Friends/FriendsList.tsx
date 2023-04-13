import User from "./User";
import UserStatus from "./UserStatus";
import axios from "axios";
import React from "react";
import { UserDto } from "src/_shared_dto/user.dto";
import { UseLoginDto } from "../Log/dto/useLogin.dto";
import { UseChatDto } from "../Chat/dto/useChat.dto";
import { UseGameDto } from "../Game/dto/useGame.dto";

export default function FriendsList({
  loginer,
  chats,
  gamer,
  reload,
  doReload,
}: {
  loginer: UseLoginDto;
  chats: UseChatDto;
  gamer: UseGameDto;
  reload: boolean;
  doReload: Function;
}) {
  const [users, setUsers] = React.useState<UserDto[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get("/api/me/friends", loginer.get_headers())
      .then((res) => {
        if (res.status === 200 && res.data) {
          setLoading(false);
          setUsers(res.data as UserDto[]);
          return;
        }
      })
      .catch((error) => {});
  }, [reload, loginer]);

  const content: JSX.Element[] = users.map((user) => (
    <li key={user.id} className="flex items-center">
      <User
        chats={chats}
        type={"friend"}
        loginer={loginer}
        gamer={gamer}
        user={user}
        doReload={doReload}
      >
        <UserStatus
          classes={"mr-1 inline-block h-3 w-3 rounded-full"}
          status={user.status}
        />
      </User>
    </li>
  ));

  return (
    <>
      <h2 className="text-2xl">Friends list</h2>
      {loading ? (
        <p className="mb-4 pl-1">Loading...</p>
      ) : (
        <>
          {content.length > 0 ? (
            <ul className="mb-4 pl-1">{content}</ul>
          ) : (
            <p className="mb-4 pl-1">Vous n'avez pas encore d'amis</p>
          )}
        </>
      )}
    </>
  );
}
