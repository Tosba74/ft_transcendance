import User from "./User";
import UserStatus from "./UserStatus";

const users: {
  id: number;
  login_name: string;
  pseudo: string;
  avatar_url: string;
  is_admin: boolean;
  access_token: null;
  color: number;
  tfa_enabled: boolean;
  status_updated_at: string;
  created_at: string;
  updated_at: string;
  validate_date: null;
  status: string;
}[] = [
  {
    id: 1,
    login_name: "passmac",
    pseudo: "passmac",
    avatar_url:
      "https://cdn.intra.42.fr/users/c858143fe558f853c994ee70fe21185f/jjaqueme.jpg",
    is_admin: false,
    access_token: null,
    color: -1,
    tfa_enabled: true,
    status_updated_at: "2023-03-24T17:43:53.540Z",
    created_at: "2023-03-24T17:43:53.589Z",
    updated_at: "2023-03-27T08:32:16.294Z",
    validate_date: null,
    status: "connected",
  },
  {
    id: 3,
    login_name: "jarom",
    pseudo: "jarom",
    avatar_url: "/avatars/default-avatar.jpg",
    is_admin: false,
    access_token: null,
    color: -1,
    tfa_enabled: false,
    status_updated_at: "2023-03-27T10:12:23.608Z",
    created_at: "2023-03-27T10:12:23.619Z",
    updated_at: "2023-03-27T10:12:23.619Z",
    validate_date: null,
    status: "idle",
  },
  {
    id: 4,
    login_name: "Julien",
    pseudo: "jarom",
    avatar_url: "/avatars/default-avatar.jpg",
    is_admin: false,
    access_token: null,
    color: -1,
    tfa_enabled: false,
    status_updated_at: "2023-03-27T10:12:23.608Z",
    created_at: "2023-03-27T10:12:23.619Z",
    updated_at: "2023-03-27T10:12:23.619Z",
    validate_date: null,
    status: "ig",
  },
  {
    id: 5,
    login_name: "Julien",
    pseudo: "jarom",
    avatar_url: "/avatars/default-avatar.jpg",
    is_admin: false,
    access_token: null,
    color: -1,
    tfa_enabled: false,
    status_updated_at: "2023-03-27T10:12:23.608Z",
    created_at: "2023-03-27T10:12:23.619Z",
    updated_at: "2023-03-27T10:12:23.619Z",
    validate_date: null,
    status: "adfdfs",
  },
];

// function handleClick(event: any) {
//   console.log(event);
//   let modal = document.querySelector(".modal");

//   console.log(modal);
//   if (modal?.classList.contains("hidden")) {
//     modal?.classList.remove("hidden");
//     // modal?.classList.add("modal absolute");
//     // modal?.classList.add("top-[" + (event.screenX + 30) + "px]");
//     // modal?.classList.add("left-[" + (event.screenY + 30) + "px]");
//     modal?.classList.add("top-[" + 30 + "px]");
//     modal?.classList.add("left-[" + 30 + "px]");
//   }
//   console.log(modal);
//   // modal
//   // modal?.className = "modal absolute";
//   // event.
// }

export default function FriendsList() {
  return (
    <>
      <h2 className="text-2xl">Friends list</h2>
      <ul className="mb-4 pl-1">
        {users.map((user) => {
          return (
            <li key={user.id}>
              <User user={user}>
                <UserStatus status={user.status} />
              </User>
            </li>
          );
        })}
      </ul>
    </>
  );
}
