import React from 'react';

import { NavLink } from "react-router-dom";

export default function Navbar() {

    return (
        <div>
            <nav className="navbar">
                <ul>
                    <li>
                    <NavLink className="navbar-home" to="/">
                        MERN GRIFFIN PRESENTS: TRIVIA
                    </NavLink>
                    </li>
                    <li>
                    <NavLink className="navbar-play" to="/play">
                        PLAY TRIVIA
                    </NavLink>
                    </li>
                    <li>
                    <NavLink className="nav-link" to="/add">
                        ADD QUESTION
                    </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}