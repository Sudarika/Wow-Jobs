import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InstituteSettings = () => {
    const [profile, setProfile] = useState(null);
    const [updatedProfile, setUpdatedProfile] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('auth-token');
                const response = await axios.get('http://localhost:8070/api/institutes/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProfile(response.data);
            } catch (err) {
                setError(err.response.data.message);
            }
        };

        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile({ ...updatedProfile, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('auth-token');
            await axios.put('http://localhost:8070/api/institutes/profile', updatedProfile, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            window.location.reload(); // Refresh the page to reflect the changes
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Update Institute Profile</h2>
                </div>
                <div className="card-body">
                    {error && <p className="text-danger">{error}</p>}
                    {profile && (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="instituteName" className="form-label">Institute Name</label>
                                <input type="text" className="form-control" id="instituteName" name="instituteName" defaultValue={profile.instituteName} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" name="email" defaultValue={profile.email} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <input type="text" className="form-control" id="description" name="description" defaultValue={profile.profile.description} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="location" className="form-label">Location</label>
                                <input type="text" className="form-control" id="location" name="location" defaultValue={profile.profile.location} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="websiteUrl" className="form-label">Website URL</label>
                                <input type="text" className="form-control" id="websiteUrl" name="websiteUrl" defaultValue={profile.profile.websiteUrl} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" name="password" onChange={handleInputChange} />
                            </div>
                            <button type="submit" className="btn btn-primary">Save Changes</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InstituteSettings;
