import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InstituteProfile = () => {
    const [profile, setProfile] = useState(null);
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

    return (
        <div className="container mt-5">
            <h1 className="text-center">Institute <span className="text-success mb-3">Profile</span></h1>
            <div className="card">
                <div className="card-header bg-success text-white">
                    <h2 className="card-title">{profile ? profile.instituteName : 'Loading...'}</h2>
                </div>
                <div className="card-body">
                    {error && <p className="text-danger">{error}</p>}
                    {profile && (
                        <>
                            <div className="row">
                                <div className="col-md-6">
                                    <p><strong>Email:</strong> {profile.email}</p>
                                    <p><strong>Location:</strong> {profile.profile.location}</p>
                                </div>
                                <div className="col-md-6">
                                    <p><strong>Website:</strong> <a href={profile.profile.websiteUrl}>{profile.profile.websiteUrl}</a></p>
                                    <p><strong>Description:</strong> {profile.profile.description}</p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InstituteProfile;
