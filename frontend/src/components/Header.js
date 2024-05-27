import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = ({ isLoggedIn, handleLogout }) => {
    const location = useLocation();
    return (
        <div className="header">
            <Link to="/" className="logo">
                <img src="logo.svg" alt="Sweet Potato Logo" />
                <h1>Sweet Potato</h1>
            </Link>
            {location.pathname === '/' && (
                <div className="header-right">
                    {isLoggedIn ? (
                        <>
                            <Link to="/add-product" className="icon-button">+</Link>
                            <button className="auth-button" onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="auth-button">Log in</Link>
                    )}
                </div>
            )}
        </div>
    );
};

export default Header;
