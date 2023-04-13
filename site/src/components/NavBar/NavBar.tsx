import classNames from "classnames";
import React, { useState } from "react";
import { UseGameDto } from "../Game/dto/useGame.dto";
import { Link } from "react-router-dom";
import BurgerButton from "./BurgerButton";
import ProfileButton from "./ProfileButton";

import { UseLoginDto } from "../Log/dto/useLogin.dto";

interface NavBarProps {
  loginer: UseLoginDto;
  gamer: UseGameDto;
  openedMenu: string;
  setOpenedMenu: Function;
}

export default function NavBar({
  loginer,
  gamer,
  openedMenu,
  setOpenedMenu,
}: NavBarProps) {
  const handleClick = () => {
    if (openedMenu == "burger") {
      if (!loginer.logged) setOpenedMenu("");
    } else {
      if (!loginer.logged) setOpenedMenu("burger");
    }
  };
  const ref = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (ref && !loginer.logged) {
        if (
          openedMenu &&
          openedMenu == "burger" &&
          !ref.current?.contains(e.target)
        ) {
          setOpenedMenu("");
        }
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [openedMenu]);
  //
  return (
    <header className="top-0 z-50 w-full">
      <nav
        className={classNames(
          "z-50 px-2 py-2.5 shadow-lg sm:px-4",
          globalThis.colorTheme
        )}
      >
        <div className="mx-auto flex flex-wrap items-center justify-between">
          <Link to="/" className="justify-start">
            <img
              src="https://42lausanne.ch/wp-content/uploads/2021/01/42_logo.svg"
              height="50"
              className="mr-3 h-6 sm:h-9"
              alt=""
            />
          </Link>
          <ProfileButton
            loginer={loginer}
            openedMenu={openedMenu}
            setOpenedMenu={setOpenedMenu}
          />
          {loginer.logged && (
            <BurgerButton
              loginer={loginer}
              gamer={gamer}
              openedMenu={openedMenu}
              setOpenedMenu={setOpenedMenu}
            />
          )}
          {!loginer.logged && (
            // <<<<<<< HEAD
            //             <div className="absolute right-0 w-full items-center justify-end shadow-lg sm:justify-center md:visible md:relative md:order-1 md:flex md:w-auto md:justify-between">
            //               <ul className="mt-4 flex flex-col bg-gray-50 p-4 dark:border-cyan-500 dark:bg-gray-800 md:visible md:mt-0 md:flex-row md:space-x-8 md:rounded-lg md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-gray-900">
            //                 <Link
            //                   to="/"
            //                   className="block rounded bg-cyan-500 py-2 pl-3 pr-4 text-white dark:text-white md:bg-transparent md:p-0 md:text-cyan-500"
            //                 >
            //                   Home
            //                 </Link>
            //               </ul>
            // =======
            <div ref={ref}>
              <button
                data-collapse-toggle="mobile-menu2"
                type="button"
                onClick={handleClick}
                className="ml-1 inline-flex items-center justify-end rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
                aria-controls="mobile-menu2"
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
                <div className="absolute right-0 w-full items-center justify-end shadow-lg sm:justify-center md:visible md:relative md:order-1 md:flex md:w-auto md:justify-between">
                  <ul className="mt-4 flex flex-col bg-gray-50 p-4 dark:border-cyan-500 dark:bg-gray-800 md:visible md:mt-0 md:flex-row md:space-x-8 md:rounded-lg md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-gray-900">
                    <Link
                      to="/"
                      className="block rounded bg-cyan-500 py-2 pl-3 pr-4 text-white dark:text-white md:bg-transparent md:p-0 md:text-cyan-500"
                    >
                      Home
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
