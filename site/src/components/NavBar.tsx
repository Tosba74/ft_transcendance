import React from "react";
import { Link } from "react-router-dom"
import logo from './logo.svg';

export default function NavBar() {
    return (
        <header className="sticky">
            <span className="logo">
                <img src="./logo.svg" alt="logo" width="49" height="99" />
            </span>
            <Link to="/" className="button ronded">
                Home
            </Link>
            <Link to="/players" className="button ronded">
                Players
            </Link>
            <Link to="/game" className="button ronded">
                Game
            </Link>
            <Link to="/reacttest" className="button ronded">
                ReactTest
            </Link>
            <Link to="/login" className="button ronded">
                Login
            </Link>
        </header>
    );
}