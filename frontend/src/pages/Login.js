import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ handleLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username && password) {
            const userRole = 'seller';
            handleLogin(userRole);
            navigate('/');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>Welcome to Sweet Potato! Please log in.</h2>
                <form onSubmit={handleSubmit}>
                    <div className="login-form-group">
                        <label htmlFor="username">USERNAME</label>
                        <input type="text" id="username" name="username" placeholder="Please enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="login-form-group">
                        <label htmlFor="password">PASSWORD</label>
                        <input type="password" id="password" name="password" placeholder="Please enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
                <p>New member? <a href="/register">Register here.</a></p>
            </div>
        </div>
    );
};

export default Login;
