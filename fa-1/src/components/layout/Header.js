import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

function Header() {
    return (
        <header className="headerStyle">
            <h1>Welk object is ouder?</h1>
            <Link className="headerLinkStyle" to="/">Uitleg</Link> | <Link className="headerLinkStyle" to="/het-spel">Het spel</Link> | <Link className="headerLinkStyle" to="/info">Info</Link>
        </header>
    )
}

export default Header;