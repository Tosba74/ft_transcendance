import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

export default function BurgerButton() {
    const [isOpen, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!isOpen);
    };
    
    return (
        <div>
            <button data-collapse-toggle="mobile-menu" type="button" onClick={handleClick} className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 md:hidden rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
            </button>
            <div className={classNames("absolute md:relative right-2 items-center sm:justify-between md:justify-between justify-end md:flex md:w-auto md:order-1 md:visible", isOpen ? "visible" : "invisible")}>
                <ul className="flex flex-col p-4 mt-4 border border-cyan-500 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-cyan-500 md:visible">
                    <Link to="/" className="block py-2 pl-3 pr-4 text-white bg-cyan-500 rounded md:bg-transparent md:text-cyan-500 md:p-0 dark:text-white" aria-current="page">
                        Home
                    </Link>
                    <Link to="/game" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                        Game
                    </Link>
                    <Link to="/chat" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                        Chat
                    </Link>
                    <Link to="/players" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                        Players
                    </Link>
                </ul>
            </div>
        </div>
    );
}