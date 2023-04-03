import User from "./User";
import axios from "axios";
import React from "react";
import { UserDto } from "src/_shared_dto/user.dto";
import { UseLoginDto } from "../Log/dto/useLogin.dto";
import { FiUserPlus, FiClock } from "react-icons/fi";

export default function PendingList({ loginer }: { loginer: UseLoginDto }) {
  const [usersRecv, setUsersRecv] = React.useState<UserDto[]>([]);
  const [usersSent, setUsersSent] = React.useState<UserDto[]>([]);

  const handlePending = (user: UserDto) => {
    axios
      .post(`/api/me/friends/${user.id}`, {}, loginer.get_headers())
      .then((res) => {
        if (res.status === 201) {
          console.log(res.data);
          return;
        }
      })
      .catch((error) => {});

    // console.log(
    //   "should accept " +
    //     user.login_name +
    //     "(" +
    //     user.id +
    //     ")" +
    //     " from pending list"
    // );
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
  }, []);

  let content: JSX.Element[] = usersRecv.map((user) => (
    <li className="flex items-center" key={user.id}>
      <User type={"ask"} loginer={loginer} user={user}>
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
        <User type={"sent"} loginer={loginer} user={user}>
          <FiClock
            // onClick={() => handlePending(user)}
            className="mr-1 inline-block"
          />
        </User>
      </li>
    ))
  );

  return (
    <>
      {content && (
        <>
          <h2 className="text-2xl">Pending list</h2>
          <ul className="mb-4 pl-1">{content}</ul>
        </>
      )}
    </>
  );
}
