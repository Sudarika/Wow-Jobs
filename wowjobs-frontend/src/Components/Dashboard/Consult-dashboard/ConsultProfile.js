import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { CgProfile } from "react-icons/cg";

const ConsultProfile = () => {
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchConsultantProfile = async () => {
            try {
                const consultantId = localStorage.getItem('consultantID');
                if (!consultantId) {
                    throw new Error('Consultant ID not found');
                }

                const response = await axios.get(`http://localhost:8070/api/consultants/${consultantId}`);
                setProfileData(response.data);
            } catch (error) {
                console.error('Error fetching consultant profile:', error);
                setError('Error fetching consultant profile. Please try again.');
            }
        };

        fetchConsultantProfile();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleUpdateProfile = async () => {
        try {
            const consultantId = localStorage.getItem('consultantID');
            if (!consultantId) {
                throw new Error('Consultant ID not found');
            }

            const response = await axios.put(`http://localhost:8070/api/consultants/${consultantId}`, profileData);
            setSuccessMessage('Consultant profile updated successfully');
        } catch (error) {
            console.error('Error updating consultant profile:', error.response.data);
            setError('Error updating consultant profile. Please try again.');
        }
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col className="">
                    <div className="border border rounded-5 shadow p-5" style={{ backgroundColor: '#f5f5f5' }}>
                        <center>
                            <h2><span className="text-danger">Consultant</span> <span className="text-success"> Profile</span></h2>
                        </center>

                        <center>
                            <CgProfile className="fw-bold mt-3" style={{ fontSize: '70px', color: '#28a745' }} />
                        </center>
                        <div className="row">
                            <div className="col"></div>
                            <div className="col">
                                <Form>
                                    <Form.Group controlId="firstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="text" name="firstName" value={profileData.firstName} onChange={handleInputChange} />
                                    </Form.Group>
                                    <Form.Group controlId="lastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" name="lastName" value={profileData.lastName} onChange={handleInputChange} />
                                    </Form.Group>
                                    <Form.Group controlId="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" name="email" value={profileData.email} onChange={handleInputChange} />
                                    </Form.Group>
                                    <center>
                                        <Button variant="success" className="mt-3" onClick={handleUpdateProfile}>Update Profile</Button>
                                    </center>
                                </Form>
                            </div>
                            <div className="col"></div>
                        </div>
                    </div>

                    {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                    {successMessage && <Alert variant="success" className="mt-3">{successMessage}</Alert>}
                </Col>
            </Row>
        </Container>
    );
};

export default ConsultProfile;
