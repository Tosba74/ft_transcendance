import FriendsList from "./FriendsList";
import BannedList from "./BannedList";
import AddFriend from "./AddFriend";

export default function FriendsPage() {
  return (
    <div className="lg:container lg:mx-auto">
      <h1 className="pb-4 text-center text-3xl">Friends List</h1>
      <div className="flex flex-col px-4">
        <FriendsList />
        <BannedList />
        <AddFriend />
      </div>
    </div>
  );
}
