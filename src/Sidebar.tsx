import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="sidebar">
            <h1>Menu</h1>
            <li className="menu">
                <a href="/">Home</a>
                <a href="/graphical">Graphical</a>
                <a href="/Bisection">Bisection</a>
                <a href="/falseposition">False Position</a>
                <a href="/fixedpoint">Fixed Point</a>
                <a href="/newtonraphson">Newton Raphson</a>
            </li>
        </div>
    );
}

export default Sidebar;