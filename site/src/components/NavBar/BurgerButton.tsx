import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import { UseLoginDto } from "../Log/dto/useLogin.dto";

interface BurgerButtonProps {
  loginer: UseLoginDto;
  openedMenu: string;
  setOpenedMenu: Function;
}

export default function BurgerButton({
  loginer,
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

  // const styles = {
  // 	myProgress: {
  // 		width: "100%",
  // 		backgroundColor: "#ddd"
  // 	},

  // 	myBar: {
  // 		width: "0%",
  // 		height: "30px",
  // 		backgroundColor: "#4CBB17"
  // 	},
  // };

  //  style={styles.myProgress}>

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
          openedMenu == "burger" ? "visible" : "invisible"
        )}
      >
        <ul className="mt-4 flex flex-col bg-gray-50 p-4 dark:border-cyan-500 dark:bg-gray-800 md:visible md:mt-0 md:flex-row md:space-x-8 md:rounded-lg md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-gray-900">
          <Link
            to="/game"
            className="block rounded bg-cyan-500 py-2 pl-3 pr-4 text-white dark:text-white md:bg-transparent md:p-0 md:text-cyan-500"
            aria-current="page"
          >
            Game
          </Link>
          <Link
            to="/setprofil"
            className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
          >
            Profil
          </Link>
          <Link
            to="/friends"
            className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
          >
            Friends
          </Link>
          <Link
            to="/players"
            className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
          >
            Players
          </Link>
          {loginer.logged && (
            <Link
              to="/profile"
              className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
            >
              Profile
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
}
