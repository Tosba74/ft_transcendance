import React from "react";
import BurgerButton from './BurgerButton'
import ProfileButton from "./Profile/ProfileButton";

export default function NavBar() {
    return (
        <header className="bg-cyan-500 z-50 fixed top-0 w-full">
            <nav className="bg-cyan-500 border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-600">
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <a href="/home" className="flex items-center">
                        <img src="https://42lausanne.ch/wp-content/uploads/2021/01/42_logo.svg" height="50" className="h-6 mr-3 sm:h-9" alt="" />
                    </a>
                    <ProfileButton />
                    <BurgerButton />
                </div>
            </nav>
        </header>
    );
}
