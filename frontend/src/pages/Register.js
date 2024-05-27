import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'; 

const Register = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/login")
    }

    const handleCancel = (e) => {
        navigate("/login")
    }

    return (
        <div className="register-page">
            <div className="register-container">
                <h2>Create your Sweet Potato Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group-reg">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" placeholder="Enter your username" />
                    </div>
                    <div className="form-group-reg">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" id="email" name="email" placeholder="Enter your E-mail" />
                    </div>
                    <div className="form-group-reg">
                        <label htmlFor="firstname">Firstname</label>
                        <input type="text" id="firstname" name="firstname" placeholder="Enter your firstname" />
                    </div>
                    <div className="form-group-reg">
                        <label htmlFor="sirname">Sirname</label>
                        <input type="text" id="sirname" name="sirname" placeholder="Enter your sirname" />
                    </div>
                    <div className="form-group-reg">
                        <label htmlFor="dob">Date of Birth</label>
                        <input type="date" id="dob" name="dob" />
                    </div>
                    <div className="form-group-reg">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" />
                    </div>
                    <div className="form-group-reg">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Enter your password again" />
                    </div>
                    <button type="submit" className="signup-button">Sign up</button>
                    <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
