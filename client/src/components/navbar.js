import React from 'react';

import { NavLink } from "react-router-dom";

export default function Navbar() {

    return (
        <div className="links-container">
            <nav className="navbar">
                <ul>
                    <li>
                    <NavLink className="navbar-link" to="/">
                        MERN GRIFFIN PRESENTS: TRIVIA
                    </NavLink>
                    </li>
                    <li>
                    <NavLink className="navbar-link" to="/play">
                        PLAY TRIVIA
                    </NavLink>
                    </li>
                    <li>
                    <NavLink className="navbar-link" to="/add">
                        ADD QUESTION
                    </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}