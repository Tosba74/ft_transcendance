import User from "./User";
import UserStatus from "./UserStatus";
import axios from "axios";
import React from "react";
import { UserDto } from "src/_shared_dto/user.dto";
import { UseLoginDto } from "../Log/dto/useLogin.dto";

export default function FriendsList({ loginer }: { loginer: UseLoginDto }) {
  let [users, setUsers] = React.useState<UserDto[]>([]);

  React.useEffect(() => {
    axios
      .get("/api/me/friends", loginer.get_headers())
      .then((res) => {
        if (res.status === 200 && res.data) {
          setUsers(res.data as UserDto[]);
          return;
        }
      })
      .catch((error) => {});
  }, []);

  const content: JSX.Element[] = users.map((user) => (
    <li key={user.id}>
      <User loginer={loginer} user={user}>
        <UserStatus status={user.color} />
      </User>
    </li>
  ));

  return (
    <>
      <h2 className="text-2xl">Friends list</h2>
      {users.length ? (
        <ul className="mb-4 pl-1">{content}</ul>
      ) : (
        <p>Vous n'avez pas encore d'amis</p>
      )}
    </>
  );
}
