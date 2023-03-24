import User from "./User";
import UserStatus from "./UserStatus";

export default function FriendsList() {
  return (
    <>
      <h2 className="text-2xl">Friends list</h2>
      <ul className="mb-4 pl-1">
        <li>
          <User id={1}>
            <UserStatus id={1} />
          </User>
        </li>
        <li>
          <User id={2}>
            <UserStatus id={1} />
          </User>
        </li>
        <li>
          <User id={3}>
            <UserStatus id={1} />
          </User>
        </li>
      </ul>
    </>
  );
}
