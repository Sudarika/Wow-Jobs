import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminSignup = () => {
    const [adminName, setAdminName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8070/api/admins/register', {
                adminName,
                email,
                password
            });

            const token = response.data;
            localStorage.setItem('auth-token', token);

            navigate('/login');
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message);
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    const validateEmail = (value) => {
        // Regular expression for validating email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };

    const validatePassword = (value) => {
        // Ensure password is at least 6 characters long
        return value.length >= 6;
    };

    return (
        <center>
            <div className="container w-50 border shadow p-3 rounded-5 mt-5">
                <h2 className="my-3">Admin Signup</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Admin Name:</label>
                        <input type="text" className="form-control" value={adminName}
                               onChange={(e) => setAdminName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input type="email" className="form-control" value={email}
                               onChange={(e) => setEmail(e.target.value)} required />
                        {!validateEmail(email) && <p className="text-danger">Please enter a valid email address.</p>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input type="password" className="form-control" value={password}
                               onChange={(e) => setPassword(e.target.value)} required />
                        {!validatePassword(password) && <p className="text-danger">Password must be at least 6 characters long.</p>}
                    </div>
                    <button type="submit" className="btn btn-success">Signup</button>
                </form>
                {error && <p className="mt-3 text-danger">{error}</p>}
            </div>
        </center>
    );
};

export default AdminSignup;
