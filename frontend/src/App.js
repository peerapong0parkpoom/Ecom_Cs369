import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Shop from './pages/Shop';
import Detail from './pages/Detail';
import AddProduct from './pages/AddProduct';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('');

    const handleLogin = (role) => {
        setIsLoggedIn(true);
        setUserRole(role);
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/v1/auth/logout', {
                method: 'POST',
                credentials: 'include' // Include credentials like cookies
            });
            const data = await response.json();
            if (data.success) {
                setIsLoggedIn(false);
                setUserRole('');
            } else {
                console.error('Logout failed:', data.error);
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <Router>
            <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Shop />} />
                <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login handleLogin={handleLogin} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/add-product" element={isLoggedIn && userRole === 'seller' ? <AddProduct /> : <Navigate to="/login" />} />
                <Route path="/product/:id" element={<Detail />} />
            </Routes>
        </Router>
    );
}

export default App;
