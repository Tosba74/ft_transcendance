import React, { useState } from "react";
import { Link } from "react-router-dom";
import BurgerButton from './BurgerButton'
import ProfileButton from "./ProfileButton";

interface NavBarProps {
    logged: boolean,
}

export default function NavBar({ logged }: NavBarProps) {
    return (
        <header className="z-50 top-0 w-full">
            <nav className="bg-cyan-500 px-2 sm:px-4 py-2.5 dark:bg-gray-700 shadow-lg">
                <div className="flex flex-wrap items-center justify-between mx-auto">
                    <Link to="/" className="justify-start">
                        <img src="https://42lausanne.ch/wp-content/uploads/2021/01/42_logo.svg" height="50" className="h-6 mr-3 sm:h-9" alt="" />
                    </Link>
                    <ProfileButton logged={logged}/>
                    <BurgerButton logged={logged} />
                </div>
            </nav>
        </header>
    );
}

