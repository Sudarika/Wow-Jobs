import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8070/api/users/login', {
                username,
                password
            });

            const { token, userId } = response.data;

            localStorage.setItem('auth-token', token);
            localStorage.setItem('userID', userId);

            navigate('/user-dashboard');
        } catch (err) {
            setError('Invalid username or password. Please try again.');
            console.error('Login Error:', err);
        }
    };

    return (
        <>
            <center>
                <div className="container w-50 border shadow p-3 rounded-5 mt-5">
                    <h2 className="my-3 text-uppercase ">- USER Login -</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Username</label>
                            <input type="text" className="form-control" value={username}
                                   onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Password</label>
                            <input type="password" className="form-control" value={password}
                                   onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-success">Login</button>
                    </form>
                    {error && <p className="mt-3 text-danger">{error}</p>}
                </div>
            </center>
        </>
    );
};

export default UserLogin;
