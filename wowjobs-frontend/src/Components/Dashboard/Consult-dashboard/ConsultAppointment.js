import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';

export default function ConsultAppointment() {
    const [slotRequests, setSlotRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSlotRequests();
    }, []);

    const fetchSlotRequests = async () => {
        try {
            const consultantId = localStorage.getItem('consultantID');
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8070/api/consultants/${consultantId}/slot-requests`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSlotRequests(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching slot requests:', error);
            setError(error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">
                    Error: {error.message}
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <h2 className="mb-4"><span className="text-danger">All </span><span
                className="text-success"> Slot Requests </span></h2>

            <br/>
            <hr/>
            <br/>

            <Row>
                {slotRequests.map(slotRequest => (
                    <Col key={slotRequest._id} md={6} lg={4} className="mb-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <p className="card-text">{slotRequest.details}</p>
                                <p className="card-text">Message: {slotRequest.message}</p>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>

            <br/>
            <hr/>
            <br/>

        </Container>
    );
}
