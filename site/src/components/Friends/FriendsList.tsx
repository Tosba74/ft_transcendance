import User from "./User";
import UserStatus from "./UserStatus";
import axios from "axios";
import React from "react";
import { UserDto } from "src/_shared_dto/user.dto";
import { UseLoginDto } from "../Log/dto/useLogin.dto";
import { UseChatDto } from "../Chat/dto/useChat.dto";

export default function FriendsList({
  loginer,
  reload,
  doReload,
  chats,
}: {
  loginer: UseLoginDto;
  reload: boolean;
  doReload: Function;
  chats: UseChatDto;
}) {
  const [users, setUsers] = React.useState<UserDto[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // console.log("loadgin", reload);

    axios
      .get("/api/me/friends", loginer.get_headers())
      .then((res) => {
        if (res.status === 200 && res.data) {
          // console.log(res.data);
          setLoading(false);
          setUsers(res.data as UserDto[]);
          return;
        }
      })
      .catch((error) => {});
  }, [reload]);

  const content: JSX.Element[] = users.map((user) => (
    <li key={user.id} className="flex items-center">
      <User
        chats={chats}
        type={"friend"}
        loginer={loginer}
        user={user}
        doReload={doReload}
      >
        <UserStatus status={user.status} />
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
