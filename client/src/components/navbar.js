import React from 'react';

import { NavLink } from "react-router-dom";

export default function Navbar(props) {

    return (
        <div className="links-container">
            <nav className={props.lightMode ? 'nav-light' : 'nav-dark'}>
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