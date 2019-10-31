import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header style={headerStyle}>
            <h1>Welk object is ouder?</h1>
            <Link style={linkStyle} to="/">Uitleg</Link> | <Link style={linkStyle} to="/het-spel">Het spel</Link> | <Link style={linkStyle} to="/info">Info</Link>
        </header>
    )
}

const headerStyle = {
    background: '#e9e9e9',
    color: '#151515',
    textAlign: 'center',
    padding: '15px'
}

const linkStyle = {
    color: '#2a2a2a',
    textDecoration: 'none'
}

export default Header;