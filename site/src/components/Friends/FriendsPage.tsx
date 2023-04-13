import FriendsList from "./FriendsList";
import BannedList from "./BannedList";
import AddFriend from "./AddFriend";
import { UseLoginDto } from "../Log/dto/useLogin.dto";
import PendingList from "./PendingList";
import React from "react";
import { FiRefreshCw } from "react-icons/fi";

interface UserListPageProps {
  loginer: UseLoginDto;
  //   refreshUserInfos: Function;
}

export default function FriendsPage({ loginer }: UserListPageProps) {
  const [reload, setReload] = React.useState(false);
  const [effect, setEffect] = React.useState(false);
  const [effect2, setEffect2] = React.useState(false);
  const [count, setCount] = React.useState(0);

  function doReload() {
    setReload((old) => !old);
    setEffect(true);

    setTimeout(() => {
      setEffect(false);
    }, 1000);
  }

  const increase = () => {
    setCount((count) => count + 1);

    if (count > 7) {
      setEffect2(true);

      setTimeout(() => {
        setCount(0);
        setEffect2(false);
      }, 1000);
    }
  };

  const handleClick = () => {
    increase();
    doReload();
  };

  return (
    <div
      className={`${
        effect2 && "animate-spin"
      } mx-auto h-full h-max max-w-md bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
    >
      <div className="flex items-baseline">
        <h1 className="grow pb-4 text-center text-3xl">Friends List</h1>
        <FiRefreshCw
          className={`${
            effect && "animate-spin"
          } inline-block cursor-pointer text-xl`}
          title="Force reload"
          onClick={handleClick}
        />
      </div>
      <div className="flex flex-col px-4">
        <FriendsList loginer={loginer} reload={reload} doReload={doReload} />
        <PendingList loginer={loginer} reload={reload} doReload={doReload} />
        <BannedList loginer={loginer} reload={reload} doReload={doReload} />
        <AddFriend loginer={loginer} doReload={doReload} />
      </div>
    </div>
  );
}
