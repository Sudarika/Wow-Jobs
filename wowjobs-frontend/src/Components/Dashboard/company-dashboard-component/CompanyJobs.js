import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Card } from 'react-bootstrap';
import CompanyUpdateJob from './CompanyUpdateJob';

const CompanyJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState('');
    const [selectedJob, setSelectedJob] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [closePopup, setClosePopup] = useState(false);

    useEffect(() => {
        const fetchPostedJobs = async () => {
            try {
                const token = localStorage.getItem('auth-token');
                const response = await axios.get('http://localhost:8070/api/companies/jobs', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setJobs(response.data);
            } catch (err) {
                setError(err.response.data.message);
            }
        };

        fetchPostedJobs();
    }, [closePopup]);

    const handleDeleteJob = async (jobId) => {
        try {
            const token = localStorage.getItem('auth-token');
            await axios.delete(`http://localhost:8070/api/companies/jobs/${jobId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const updatedJobs = jobs.filter(job => job._id !== jobId);
            setJobs(updatedJobs);
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const handleUpdateJob = (job) => {
        setSelectedJob(job);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setClosePopup(prevState => !prevState);
    };

    if (error) {
        return <p className="text-danger">Error: {error}</p>;
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4"><span className="text-danger">Posted </span><span className="text-success"> Jobs</span>
            </h2>
            <br/>
            <hr/>
            <br/>
            {jobs.length === 0 && <p style={{ fontSize: '18px', color: '#888' }}>No jobs posted yet.</p>}
            {jobs.map(job => (
                <Card key={job._id} className="mb-3">
                    <Card.Body>
                        <Card.Title style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>{job.title}</Card.Title>
                        <Card.Text style={{ fontSize: '16px', marginBottom: '15px' }}>{job.description}</Card.Text>
                        <div style={{ marginBottom: '15px' }}>
                            <strong style={{ marginRight: '10px' }}>Location:</strong> {job.location}<br />
                            <strong style={{ marginRight: '10px' }}>Industry:</strong> {job.industry}
                        </div>
                        <Button variant="danger" className="me-2" style={{ marginRight: '10px' }} onClick={() => handleDeleteJob(job._id)}>Delete</Button>
                        <Button variant="primary" onClick={() => handleUpdateJob(job)}>Update</Button>
                    </Card.Body>
                </Card>
            ))}

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Job</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CompanyUpdateJob job={selectedJob} onClose={handleCloseModal} />
                </Modal.Body>
            </Modal>
        </div>
    );

};

export default CompanyJobs;
