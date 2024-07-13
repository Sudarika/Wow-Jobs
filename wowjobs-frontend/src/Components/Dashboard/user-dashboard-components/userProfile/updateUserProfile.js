import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';

export default function UpdateUserProfile() {
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        title: '',
        company: '',
        location: '',
        bio: '',
    });

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem('auth-token');

                if (token) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                    const response = await axios.get('http://localhost:8070/api/users/profile');
                    const userProfileData = response.data;

                    if (userProfileData.profile) {
                        setProfileData(userProfileData.profile);
                    }
                }
            } catch (error) {
                console.error('Error fetching user profile data:', error);
            }
        };

        fetchProfileData();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProfileData(prevProfileData => ({
            ...prevProfileData,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('auth-token');

            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                const response = await axios.put('http://localhost:8070/api/users/profile', {
                    profile: profileData
                });

                if (response.data.success) {
                    message.success('Profile updated successfully.');
                    window.location.href = '/user-dashboard';
                } else {
                    message.error('Failed to update profile.');
                }
            }
        } catch (error) {
            console.error('Error updating user profile:', error.response ? error.response.data : error.message);
            message.error('Error updating user profile. Please try again.');
        }
    };

    return (
        <div className="container mt-5 w-50 rounded-5 shadow mb-5">
            <center><h2 className="mb-4 align-self-center text-success fw-bold fs-2">Update Profile</h2></center>
            <Form onFinish={handleSubmit} layout="vertical">
                <Form.Item label="First Name" name="firstName">
                    <Input value={profileData.firstName} onChange={handleInputChange} />
                </Form.Item>
                <Form.Item label="Last Name" name="lastName">
                    <Input value={profileData.lastName} onChange={handleInputChange} />
                </Form.Item>
                <Form.Item label="Title" name="title">
                    <Input value={profileData.title} onChange={handleInputChange} />
                </Form.Item>
                <Form.Item label="Company" name="company">
                    <Input value={profileData.company} onChange={handleInputChange} />
                </Form.Item>
                <Form.Item label="Location" name="location">
                    <Input value={profileData.location} onChange={handleInputChange} />
                </Form.Item>
                <Form.Item label="Bio" name="bio">
                    <Input.TextArea value={profileData.bio} onChange={handleInputChange} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="mb-3">Update Profile</Button>
                </Form.Item>
            </Form>
        </div>
    );
}
