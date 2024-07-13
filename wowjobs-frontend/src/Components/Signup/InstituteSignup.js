import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const InstituteSignup = () => {
    const [instituteName, setInstituteName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!instituteName || !email || !password) {
            setError('All fields are required.');
            return;
        }

        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            setError('Invalid email format.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8070/api/institutes/register', {
                instituteName,
                email,
                password
            });

            const token = response.data;
            localStorage.setItem('auth-token', token);

            navigate('/login');
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return (
        <>
            <center>
                <div className="container w-50 border shadow p-3 rounded-5 mt-5">
                    <h2 className="my-3">Institute Signup</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Institute Name:</label>
                            <input type="text" className="form-control" value={instituteName}
                                   onChange={(e) => setInstituteName(e.target.value)} required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email:</label>
                            <input type="email" className="form-control" value={email}
                                   onChange={(e) => setEmail(e.target.value)} required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password:</label>
                            <input type="password" className="form-control" value={password}
                                   onChange={(e) => setPassword(e.target.value)} required/>
                        </div>
                        <button type="submit" className="btn btn-success">Signup</button>
                    </form>
                    {error && <p className="mt-3 text-danger">{error}</p>}
                </div>
            </center>
        </>
    );
};

export default InstituteSignup;
