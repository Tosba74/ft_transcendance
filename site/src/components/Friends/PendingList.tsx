import User from "./User";
import axios from "axios";
import React from "react";
import { UserDto } from "src/_shared_dto/user.dto";
import { UseLoginDto } from "../Log/dto/useLogin.dto";
import { FiUserPlus } from "react-icons/fi";

export default function PendingList({ loginer }: { loginer: UseLoginDto }) {
  const [users, setUsers] = React.useState<UserDto[]>([]);

  const handlePending = (user: UserDto) => {
    // add friend
    // axios
    //   .post(`/api/me/friends/${user.id}`, loginer.get_headers())
    //   .then((res) => {
    //     if (res.status === 201) {
    //       console.log(res.data);
    //       return;
    //     }
    //   })
    //   .catch((error) => {});

    // rm pend
    // axios
    //   .delete(`/api/me/friends/${user.id}`, loginer.get_headers())
    //   .then((res) => {
    //     if (res.status === 201) {
    //       console.log(res.data);
    //       return;
    //     }
    //   })
    //   .catch((error) => {});
    console.log(
      "should accept " +
        user.login_name +
        "(" +
        user.id +
        ")" +
        " from pending list"
    );
  };

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
    <li className="flex items-center" key={user.id}>
      <User type={"ask"} loginer={loginer} user={user}>
        <FiUserPlus
          onClick={(event) => handlePending(user)}
          className="mr-1 inline-block cursor-pointer"
        />
      </User>
    </li>
  ));

  return (
    <>
      {users.length > 0 && (
        <>
          <h2 className="text-2xl">Pending list</h2>
          <ul className="mb-4 pl-1">{content}</ul>
        </>
      )}
    </>
  );
}
