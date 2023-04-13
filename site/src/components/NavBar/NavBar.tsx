import classNames from "classnames";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import BurgerButton from "./BurgerButton";
import ProfileButton from "./ProfileButton";

import { UseLoginDto } from "../Log/dto/useLogin.dto";

interface NavBarProps {
  loginer: UseLoginDto;
  openedMenu: string;
  setOpenedMenu: Function;
}

export default function NavBar({
  loginer,
  openedMenu,
  setOpenedMenu,
}: NavBarProps) {
  //
  return (
    <header className="top-0 z-50 w-full">
      <nav
        className={classNames(
          "px-2 py-2.5 shadow-lg sm:px-4",
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
              openedMenu={openedMenu}
              setOpenedMenu={setOpenedMenu}
            />
          )}
          {!loginer.logged && (
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
          )}
        </div>
      </nav>
    </header>
  );
}
