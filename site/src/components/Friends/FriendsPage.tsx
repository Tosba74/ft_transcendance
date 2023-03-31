import FriendsList from "./FriendsList";
import BannedList from "./BannedList";
import AddFriend from "./AddFriend";
import { UseLoginDto } from "../Log/dto/useLogin.dto";
import PendingList from "./PendingList";

interface UserListPageProps {
  loginer: UseLoginDto;
  //   refreshUserInfos: Function;
}

export default function FriendsPage({ loginer }: UserListPageProps) {
  return (
    <div className=" mx-auto h-full max-w-md bg-white p-6 shadow-md md:h-max dark:border-gray-700 dark:bg-gray-800 dark:text-white">
      <h1 className="pb-4 text-center text-3xl">Friends List</h1>
      <div className="flex flex-col px-4">
        <FriendsList loginer={loginer} />
        <PendingList loginer={loginer} />
        <BannedList loginer={loginer} />
        <AddFriend loginer={loginer} />
      </div>
    </div>
  );
}
