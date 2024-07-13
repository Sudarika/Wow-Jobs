// ConsultLogin.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ConsultLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8070/api/consultants/login', {
                email,
                password
            });

            const { token, id } = response.data;
            localStorage.setItem('auth-token', token);
            localStorage.setItem('consultantID', id);

            console.log('Login successful. Redirecting to consultant dashboard...');
            navigate('/consultant-dashboard');
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'An error occurred during login.');
        }
    };

    return (
        <>
            <center>
                <div className="container w-50 border shadow p-3 rounded-5 mt-5">
                    <h2 className="my-3 text-uppercase ">- Consultant Login -</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Email</label>
                            <input type="email" className="form-control" value={email}
                                   onChange={(e) => setEmail(e.target.value)} required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Password</label>
                            <input type="password" className="form-control" value={password}
                                   onChange={(e) => setPassword(e.target.value)} required/>
                        </div>
                        <button type="submit" className="btn btn-success">Login</button>
                    </form>
                    {error && <p className="mt-3 text-danger">{error}</p>}
                </div>
            </center>
        </>
    );
};

export default ConsultLogin;
