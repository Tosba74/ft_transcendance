import React from "react";
import { UseLoginDto } from "../Log/dto/useLogin.dto";
import axios from "axios";

export default function HistoryGames({ loginer }: { loginer: UseLoginDto }) {
  // const [history, setHistory] = React.useState([]);

  // React.useEffect(() => {
  //   axios
  //     .get("/api/me/blockeds", loginer.get_headers())
  //     .then((res) => {
  //       if (res.status === 200) {
  //         // console.log(res.data as UserDto[]);
  //         setHistory(res.data);
  //         setUsers(res.data as UserDto[]);

  //         return;
  //       }
  //     })
  //     .catch((error) => {});
  // }, []);

  // const content: JSX.Element[] = users.map((user) => (
  //   <li key={user.id} className="flex items-center">
  //     <User type={"friend"} loginer={loginer} user={user} doReload={doReload}>
  //       <UserStatus status={user.status} />
  //     </User>
  //   </li>
  // ));

  const content = (
    <>
      <li>7 Tiago vs Jerome 3</li>
      <li>7 Tiago vs Jerome 3</li>
      <li>7 Tiago vs Jerome 3</li>
    </>
  );

  return (
    <>
      <h2 className="text-left">Last games</h2>
      <ul>{content}</ul>
    </>
  );
}
