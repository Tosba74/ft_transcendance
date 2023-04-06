import logoInconnu from "../assets/img/inconnu.jpeg";
import { Link } from "react-router-dom";
import { UserDto } from "src/_shared_dto/user.dto";

interface UserCardProps {
  user: UserDto;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    // <div className="w-full h-screen">

    <div className="flex justify-between">
      <div className="mt-4 h-1/4 w-full max-w-sm rounded-lg border border-gray-200 bg-white p-10 shadow dark:border-gray-700 dark:bg-gray-800">
        <div className="flex h-80 flex-col items-center pb-10">
          <img
            className="mb-3 h-36 w-36 rounded-full object-cover shadow-lg"
            src={user.avatar_url}
            alt={user.login_name}
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {user.pseudo}
          </h5>
          <h3 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {user.login_name}
          </h3>
          <div className="mt-4 flex space-x-3 md:mt-6">
            <Link
              to="#"
              className="inline-flex items-center rounded-lg bg-cyan-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add friend
            </Link>
            <Link
              to="#"
              className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              Message
            </Link>
          </div>
        </div>
      </div>
    </div>

    // </div>
  );
}
