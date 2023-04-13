import { Link } from "react-router-dom";
import classNames from "classnames";

import { UseLoginDto } from "../Log/dto/useLogin.dto";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { UseGameDto } from "../Game/dto/useGame.dto";

interface BurgerButtonProps {
  loginer: UseLoginDto;
  gamer: UseGameDto;
  openedMenu: string;
  setOpenedMenu: Function;
}

export default function BurgerButton({
  loginer,
  gamer,
  openedMenu,
  setOpenedMenu,
}: BurgerButtonProps) {
  //
  const handleClick = () => {
    if (openedMenu == "burger") {
      setOpenedMenu("");
    } else {
      setOpenedMenu("burger");
    }
  };
  const location = useLocation();
  return (
    <div>
      <button
        data-collapse-toggle="mobile-menu"
        type="button"
        onClick={handleClick}
        className="ml-1 inline-flex items-center justify-end rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
        aria-controls="mobile-menu"
        aria-expanded="false"
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="h-6 w-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <div
        className={classNames(
          "absolute right-0 w-full items-center justify-end shadow-lg sm:justify-center md:visible md:relative md:order-1 md:flex md:w-auto md:justify-between",
          openedMenu === "burger" ? "visible" : "invisible"
        )}
      >
        <ul className="mt-4 flex flex-col bg-gray-50 p-4 dark:border-cyan-500 dark:bg-gray-800 md:visible md:mt-0 md:flex-row md:space-x-8 md:rounded-lg md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-gray-900">
          <Link
            to="/"
            className={classNames(
              "block rounded py-2 pl-3 pr-4 md:p-0",
              location.pathname == "/"
                ? "bg-cyan-500 text-white dark:text-white md:bg-transparent md:text-cyan-500"
                : " text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white  md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
            )}
          >
            Home
          </Link>
          <Link
            to="/start"
            className={classNames(
              "block rounded py-2 pl-3 pr-4 md:p-0",
              location.pathname == "/start"
                ? "bg-cyan-500 text-white dark:text-white md:bg-transparent md:text-cyan-500"
                : " text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white  md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
            )}
          >
            Start game
          </Link>
          {gamer.gameId != -1 && gamer.gameArea.current?.ended === false && (
            <Link
              to="/game"
              className={classNames(
                "block rounded py-2 pl-3 pr-4 md:p-0",
                location.pathname == "/game"
                  ? "bg-cyan-500 text-white dark:text-white md:bg-transparent md:text-cyan-500"
                  : " text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white  md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
              )}
            >
              Game
            </Link>
          )}
          <Link
            to="/friends"
            className={classNames(
              "block rounded py-2 pl-3 pr-4 md:p-0",
              location.pathname == "/friends"
                ? "bg-cyan-500 text-white dark:text-white md:bg-transparent md:text-cyan-500"
                : " text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white  md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
            )}
          >
            Friends
          </Link>
          <Link
            to="/channels"
            className={classNames(
              "block rounded py-2 pl-3 pr-4 md:p-0",
              location.pathname == "/channels"
                ? "bg-cyan-500 text-white dark:text-white md:bg-transparent md:text-cyan-500"
                : " text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white  md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
            )}
          >
            Channels
          </Link>
          <Link
            to="/players"
            className={classNames(
              "block rounded py-2 pl-3 pr-4 md:p-0",
              location.pathname == "/players"
                ? "bg-cyan-500 text-white dark:text-white md:bg-transparent md:text-cyan-500"
                : " text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white  md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
            )}
          >
            Players
          </Link>
        </ul>
      </div>
    </div>
  );
}
