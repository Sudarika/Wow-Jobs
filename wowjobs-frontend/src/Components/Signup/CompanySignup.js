import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CompanySignup = () => {
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [industry, setIndustry] = useState('');
    const [companySize, setCompanySize] = useState('');
    const [websiteUrl, setWebsiteUrl] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            // Validation
            if (!/^[a-zA-Z\s]*$/.test(companyName)) {
                throw new Error('Company name cannot contain numbers.');
            }
            if (!/^\S+@\S+\.\S+$/.test(email)) {
                throw new Error('Invalid email format.');
            }
            if (password.length < 6) {
                throw new Error('Password must be 6 characters or more.');
            }
            if (!/^[a-zA-Z\s]*$/.test(location)) {
                throw new Error('Location cannot contain numbers.');
            }
            if (!/^[a-zA-Z\s]*$/.test(industry)) {
                throw new Error('Industry cannot contain numbers.');
            }
            if (!/^(ftp|http|https):\/\/[^ "]+$/.test(websiteUrl)) {
                throw new Error('Invalid website URL format.');
            }

            const response = await axios.post('http://localhost:8070/api/companies/create', {
                companyName,
                email,
                password,
                description,
                location,
                industry,
                companySize,
                websiteUrl
            });

            console.log(response.data);

            navigate('/login');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <center>
                <div className="container w-50 border shadow p-3 rounded-5 mt-5">
                    <h2 className="my-3">Company Signup</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Company Name:</label>
                            <input type="text" className="form-control" value={companyName}
                                   onChange={(e) => setCompanyName(e.target.value)} required/>
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
                        <div className="mb-3">
                            <label className="form-label">Description:</label>
                            <input type="text" className="form-control" value={description}
                                   onChange={(e) => setDescription(e.target.value)} required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Location:</label>
                            <input type="text" className="form-control" value={location}
                                   onChange={(e) => setLocation(e.target.value)} required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Industry:</label>
                            <input type="text" className="form-control" value={industry}
                                   onChange={(e) => setIndustry(e.target.value)} required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Company Size:</label>
                            <input type="number" className="form-control" value={companySize}
                                   onChange={(e) => setCompanySize(e.target.value)} required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Website URL:</label>
                            <input type="text" className="form-control" value={websiteUrl}
                                   onChange={(e) => setWebsiteUrl(e.target.value)} required/>
                        </div>
                        <button type="submit" className="btn btn-success">Signup</button>
                    </form>
                    {error && <p className="mt-3 text-danger">{error}</p>}
                </div>
            </center>
        </>
    );
};

export default CompanySignup;
