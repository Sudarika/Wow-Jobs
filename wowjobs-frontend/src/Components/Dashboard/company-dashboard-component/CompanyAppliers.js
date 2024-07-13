import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';

const CompanyAppliers = () => {
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const token = localStorage.getItem('auth-token');
                const response = await axios.get('http://localhost:8070/api/companies/receivedApplications', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setApplications(response.data);
            } catch (err) {
                setError(err.response.data.message);
            }
        };

        fetchApplications();
    }, []);

    const handleAcceptReject = async (jobId, applicantId, status) => {
        try {
            const token = localStorage.getItem('auth-token');
            await axios.put(`http://localhost:8070/api/companies/jobs/${jobId}/applications/${applicantId}/${status}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Update the application status in the local state
            const updatedApplications = applications.map(app => {
                if (app._id === jobId) {
                    const updatedApplicants = app.applicants.map(applicant => {
                        if (applicant._id === applicantId) {
                            return { ...applicant, status };
                        }
                        return applicant;
                    });
                    return { ...app, applicants: updatedApplicants };
                }
                return app;
            });
            setApplications(updatedApplications);
        } catch (err) {
            console.error(err.response.data.message);
            setError('Error updating application status. Please try again later.');
        }
    };


    if (error) {
        return <p className="text-danger">{error}</p>;
    }

    return (
        <div className="container mt-5">
            <h2 className="text-success mb-3">Received Job Applications</h2>
            {applications.map(application => (
                <Card key={application._id} className="mb-3" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <Card.Body>
                        <Card.Title>{application.title}</Card.Title>
                        <Card.Text>{application.description}</Card.Text>
                        <Card.Text>Applicants:</Card.Text>
                        <ul className="list-group list-group-flush">
                            {application.applicants.map(applicant => (
                                <li key={applicant._id} className="list-group-item" style={{ backgroundColor: '#f8f9fa' }}>
                                    <div>
                                        <strong>Name:</strong> {applicant.applicant.profile.firstName} {applicant.applicant.profile.lastName}
                                    </div>
                                    <div>
                                        <strong>Status:</strong> {applicant.status}
                                    </div>
                                    {applicant.status === 'pending' && (
                                        <div>
                                            <Button variant="success" className="mr-2" onClick={() => handleAcceptReject(application._id, applicant.applicant._id, 'accept')}>Accept</Button>
                                            <Button variant="danger" onClick={() => handleAcceptReject(application._id, applicant.applicant._id, 'reject')}>Reject</Button>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );

};

export default CompanyAppliers;
