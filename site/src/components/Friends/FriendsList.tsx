import User from "./User";
import UserStatus from "./UserStatus";
import axios from "axios";
import React from "react";
import { UserDto } from "src/_shared_dto/user.dto";
import { UseLoginDto } from "../Log/dto/useLogin.dto";

export default function FriendsList({ loginer }: { loginer: UseLoginDto }) {
  const [users, setUsers] = React.useState<UserDto[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
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
  }, []);

  const content: JSX.Element[] = users.map((user) => (
    <li key={user.id} className="flex items-center">
      <User type={"friend"} loginer={loginer} user={user}>
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
