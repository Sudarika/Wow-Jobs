import React, {useState} from 'react';
import axios from 'axios';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';

const CompanyCreateJobs = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [requirements, setRequirements] = useState('');
    const [applicationInstructions, setApplicationInstructions] = useState('');
    const [location, setLocation] = useState('');
    const [industry, setIndustry] = useState('');
    const [jobType, setJobType] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('auth-token');
            const response = await axios.post(
                'http://localhost:8070/api/companies/jobs',
                {
                    title,
                    description,
                    requirements: requirements.split(',').map(req => req.trim()),
                    applicationInstructions,
                    location,
                    industry,
                    jobType
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="text-success" style={{textAlign: 'center', marginBottom: '40px'}}>Create a New Job</h2>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Title:</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            style={{borderColor: '#007bff'}}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            style={{borderColor: '#007bff'}}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Requirements (comma-separated):</Form.Label>
                        <Form.Control
                            type="text"
                            value={requirements}
                            onChange={(e) => setRequirements(e.target.value)}
                            required
                            style={{borderColor: '#007bff'}}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Application Instructions:</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={applicationInstructions}
                            onChange={(e) => setApplicationInstructions(e.target.value)}
                            required
                            style={{borderColor: '#007bff'}}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Location:</Form.Label>
                        <Form.Control
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                            style={{borderColor: '#007bff'}}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Industry:</Form.Label>
                        <Form.Control
                            type="text"
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            required
                            style={{borderColor: '#007bff'}}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Job Type:</Form.Label>
                        <Form.Control
                            type="text"
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value)}
                            required
                            style={{borderColor: '#007bff'}}
                        />
                    </Form.Group>
                </Row>
                <center>
                    <Button type="submit" variant="success">Create Job</Button>
                </center>
                {error && <p className="text-danger mt-3">{error}</p>}
            </Form>
        </Container>
    );
};

export default CompanyCreateJobs;
