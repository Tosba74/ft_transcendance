import FriendsList from "./FriendsList";
import BannedList from "./BannedList";
import AddFriend from "./AddFriend";
import { UseLoginDto } from "../Log/dto/useLogin.dto";

interface UserListPageProps {
  loginer: UseLoginDto;
  //   refreshUserInfos: Function;
}

export default function FriendsPage({ loginer }: UserListPageProps) {
  return (
    <div className="mx-auto max-w-md">
      <h1 className="pb-4 text-center text-3xl">Friends List</h1>
      <div className="flex flex-col px-4">
        <FriendsList loginer={loginer} />
        <BannedList loginer={loginer} />
        <AddFriend />
      </div>
    </div>
  );
}
