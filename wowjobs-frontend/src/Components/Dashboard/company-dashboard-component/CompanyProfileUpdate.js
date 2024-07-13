import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompanyProfileUpdate = ({ onClose }) => {
    const [companyData, setCompanyData] = useState({
        description: '',
        location: '',
        industry: '',
        companySize: '',
        websiteUrl: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanyProfile = async () => {
            try {
                const token = localStorage.getItem('auth-token');
                const response = await axios.get('http://localhost:8070/api/companies/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCompanyData(response.data.profile);
                setLoading(false);
            } catch (err) {
                setError(err.response.data.message);
                setLoading(false);
            }
        };

        fetchCompanyProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompanyData({ ...companyData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('auth-token');
            await axios.put('http://localhost:8070/api/companies/profile', companyData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            onClose();
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-danger">Error: {error}</p>;
    }

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <h2>Update Company Profile</h2>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={companyData.description} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input type="text" className="form-control" id="location" name="location" value={companyData.location} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="industry" className="form-label">Industry</label>
                    <input type="text" className="form-control" id="industry" name="industry" value={companyData.industry} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="companySize" className="form-label">Company Size</label>
                    <input type="text" className="form-control" id="companySize" name="companySize" value={companyData.companySize} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="websiteUrl" className="form-label">Website URL</label>
                    <input type="text" className="form-control" id="websiteUrl" name="websiteUrl" value={companyData.websiteUrl} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
};

export default CompanyProfileUpdate;
