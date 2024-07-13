import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const UserProfile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('auth-token');

                if (token) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                    const response = await axios.get('http://localhost:8070/api/users/profile');
                    const userProfileData = response.data;

                    setUserProfile(userProfileData);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <div className="container mt-5">
            <div className="text-center">
                <h2 className="text-success mb-4">User Profile</h2>
            </div>
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : userProfile ? (
                <div>
                    <div className="card mb-4">
                        <div className="card-body">
                            <h3 className="card-title">Basic Information</h3>
                            <p><strong>Username:</strong> {userProfile.username}</p>
                            <p><strong>Email:</strong> {userProfile.email}</p>
                        </div>
                    </div>
                    <div className="card mb-4">
                        <div className="card-body">
                            <h3 className="card-title">Profile Details</h3>
                            <p><strong>First Name:</strong> {userProfile.profile.firstName}</p>
                            <p><strong>Last Name:</strong> {userProfile.profile.lastName}</p>
                            <p><strong>Title:</strong> {userProfile.profile.title}</p>
                            <p><strong>Company:</strong> {userProfile.profile.company}</p>
                            <p><strong>Location:</strong> {userProfile.profile.location}</p>
                            <p><strong>Bio:</strong> {userProfile.profile.bio}</p>
                        </div>
                    </div>
                    <div className="card mb-4">
                        <div className="card-body">
                            <h3 className="card-title">Education</h3>
                            {userProfile.profile.education.map((edu, index) => (
                                <div key={index}>
                                    <p><strong>Institution:</strong> {edu.institution}</p>
                                    <p><strong>Degree:</strong> {edu.degree}</p>
                                    <p><strong>Field of Study:</strong> {edu.fieldOfStudy}</p>
                                    <p><strong>Start Year:</strong> {edu.startYear}</p>
                                    <p><strong>End Year:</strong> {edu.endYear}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="card mb-4">
                        <div className="card-body">
                            <h3 className="card-title">Skills</h3>
                            <ul className="list-unstyled">
                                {userProfile.profile.skills.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="card mb-4">
                        <div className="card-body">
                            <h3 className="card-title">Contact Information</h3>
                            <p><strong>Phone:</strong> {userProfile.contact.phone}</p>
                            <p><strong>Address:</strong> {userProfile.contact.address}</p>
                            <p><strong>LinkedIn:</strong> {userProfile.contact.linkedIn}</p>
                            <p><strong>Twitter:</strong> {userProfile.contact.twitter}</p>
                        </div>
                    </div>

                    <div className="text-center">
                        <Link to="/updateUserProfile" className="btn btn-success mt-3 mb-5">Update Profile</Link>
                    </div>

                    <hr />
                </div>
            ) : (
                <p className="text-center">No profile found.</p>
            )}
        </div>
    );
}

export default UserProfile;
