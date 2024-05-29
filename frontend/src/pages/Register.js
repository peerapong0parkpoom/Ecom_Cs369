import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [dob, setDob] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !email || !firstname || !lastname || !dob || !password || !confirmPassword) {
            setError("All fields are required!");
            alert("All fields are required!");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch('/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    first_name: firstname,
                    last_name: lastname,
                    email,
                    password,
                    date_of_birth: dob
                })
            });

            const data = await response.json();

            if (data.success) {
                navigate("/login");
            } else {
                setError(data.message || 'Registration failed');
                alert(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('Registration failed. Please try again later.');
            alert('Registration failed. Please try again later.');
        }
    };

    const handleCancel = () => {
        navigate("/login");
    };

    return (
        <div className="register-page">
            <div className="register-container">
                <h2>Create your Sweet Potato Account</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group-reg">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="form-group-reg">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" id="email" name="email" placeholder="Enter your E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group-reg">
                        <label htmlFor="firstname">Firstname</label>
                        <input type="text" id="firstname" name="firstname" placeholder="Enter your firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                    </div>
                    <div className="form-group-reg">
                        <label htmlFor="lastname">Lastname</label>
                        <input type="text" id="lastname" name="lastname" placeholder="Enter your lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                    </div>
                    <div className="form-group-reg">
                        <label htmlFor="dob">Date of Birth</label>
                        <input type="date" id="dob" name="dob" value={dob} onChange={(e) => setDob(e.target.value)} />
                    </div>
                    <div className="form-group-reg">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="form-group-reg">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Enter your password again" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="signup-button">Sign up</button>
                    <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
