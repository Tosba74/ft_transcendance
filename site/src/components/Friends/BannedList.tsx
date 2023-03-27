import User from "./User";
import { MdClose } from "react-icons/md";

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
    login_name: "Alain",
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
    id: 13,
    login_name: "Guillaume",
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
];

interface UserProps {
  user: {
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
  };
  children?: React.ReactNode;
}

export default function BannedList() {
  return (
    <>
      <h2 className="text-2xl">Banned list</h2>
      <ul className="mb-4 pl-1">
        {users.map((user) => {
          return (
            <li key={user.id} className="text-slate-500 line-through">
              <span className="cursor-pointer">
                <MdClose className="inline-block" />
                <User user={user}></User>
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
