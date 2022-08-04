import React from 'react';

import { NavLink } from "react-router-dom";

export default function Navbar() {

    return (
        <div>
            <nav className="navbar">
                <NavLink className="navbar-home" to="/">
                    MERN GRIFFIN PRESENTS: TRIVIA
                </NavLink>
                <NavLink className="navbar-play" to="/play">
                    PLAY TRIVIA
                </NavLink>
                <NavLink className="nav-link" to="/add">
                    ADD QUESTION
                </NavLink>
            </nav>
        </div>
    );
}