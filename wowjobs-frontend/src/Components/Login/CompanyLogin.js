import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CompanyLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8070/api/companies/login', {
                email,
                password
            });

            const token = response.data.token;
            localStorage.setItem('auth-token', token);

            navigate('/company-dashboard');
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return (
        <>
            <center>
                <div className="container w-50 border shadow p-3 rounded-5 mt-5">
                    <h2 className="my-3 text-uppercase">- Company Login -</h2>
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

export default CompanyLogin;
