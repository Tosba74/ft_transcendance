import LogoInconnu from "../../assets/img/inconnu.jpeg";
import { Link } from "react-router-dom";
import { UseLoginDto } from "../Log/dto/useLogin.dto";

interface ProfileButtonProps {
  loginer: UseLoginDto;
  openedMenu: string;
  setOpenedMenu: Function;
}

export default function ProfileButton({
  loginer,
  openedMenu,
  setOpenedMenu,
}: ProfileButtonProps) {
  const handleClick = () => {
    if (openedMenu === "profile") {
      setOpenedMenu("");
    } else {
      setOpenedMenu("profile");
    }
  };

  // <div class="flex items-center md:order-2">
  {
    /* <button type="button" class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom"> */
  }
  {
    /* <span class="sr-only">Open user menu</span> */
  }
  {
    /* <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo"> */
  }
  {
    /* </button> */
  }

  return (
    <div className="flex items-center md:order-2">
      <button
        type="button"
        onClick={handleClick}
        className="mr-3 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 md:mr-0"
        id="user-menu-button"
        aria-expanded="false"
        data-dropdown-toggle="user-dropdown"
        data-dropdown-placement="bottom"
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="h-12 w-12 rounded-full object-cover"
          src={
            (loginer.logged &&
              loginer.userInfos &&
              loginer.userInfos.avatar_url) ||
            LogoInconnu
          }
          alt={`${loginer.userInfos?.pseudo}`}
        />
      </button>
      {openedMenu === "profile" && (
        <div
          className="absolute top-20 right-2 z-40 w-40 list-none divide-y divide-gray-100 rounded-lg bg-white text-base shadow-lg dark:divide-gray-600 dark:bg-gray-700"
          id="user-dropdown"
        >
          <div className="px-4 py-3">
            <span className="block text-sm text-gray-900 dark:text-white">
              {loginer.userInfos && loginer.userInfos.login_name}
            </span>
            <span className="block truncate text-sm font-medium text-gray-500 dark:text-gray-400">
              {loginer.userInfos && loginer.userInfos.pseudo}
            </span>
          </div>
          <ul className="py-2" aria-labelledby="user-menu-button">
            {loginer.logged && (
              <>
                <Link
                  to="/history"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  History
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Settings
                </Link>
              </>
            )}
            {!loginer.logged && (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Log in
                </Link>
                <a
                  href="/api/login/apisignin"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Log in api
                </a>
              </>
            )}
            {loginer.logged && (
              <Link
                to="/logout"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Log out
              </Link>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

{
  /* isOpen && <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown"> */
}
