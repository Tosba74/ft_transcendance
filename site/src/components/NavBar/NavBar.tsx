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
          <BurgerButton
            loginer={loginer}
            openedMenu={openedMenu}
            setOpenedMenu={setOpenedMenu}
          />
        </div>
      </nav>
    </header>
  );
}
