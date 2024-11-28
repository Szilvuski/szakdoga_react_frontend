import React, {useState} from 'react';
import {NavLink, Link} from "react-router-dom"
import "./Navbar.css";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    return <nav>
        <Link to ="/" className="title">
        Főoldal
        </Link>
        <div className="menu">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <ul className={menuOpen ? "open" : ""}>
            <li>
                <NavLink to="/about">Rólunk</NavLink>
            </li>
            <li>
                <NavLink to="/services">Szolgáltatások</NavLink>
            </li>
            <li>
                <NavLink to="/sitters">Szittereink</NavLink>
            </li>
            <li>
                <NavLink to="/contact">Kapcsolat</NavLink>
            </li>
            <li>
                <NavLink to="/reservation">Foglalás</NavLink>
            </li>
        </ul>
    </nav>;
}

export default Navbar;