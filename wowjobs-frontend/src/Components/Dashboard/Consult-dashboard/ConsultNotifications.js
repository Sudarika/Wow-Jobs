import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from "react-bootstrap";

export default function ConsultNotifications() {
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

    return (
        <>
            <center>
                <h2 className="my-3"><span className="text-success">Consultant </span><span className="text-danger"> Notifications </span> </h2>
                <div className="container w-50 border shadow p-3 rounded-5 mt-5" style={{ backgroundColor: '#f5f5f5' }}>
                    <h3 className="my-3">Slot Requests</h3>
                    <p className="fs-1 text-danger">{slotRequests.length}</p>
                </div>
            </center>


            {/* Display Slot Requests */}
            <Container className="mt-5">
                <h2 className="mb-4"><span className="text-warning">New </span><span className="text-success"> Slot Requests </span></h2>
                {slotRequests.map(slotRequest => (
                    <div key={slotRequest._id} className="card shadow-sm mb-4" style={{ backgroundColor: '#fff' }}>
                        <div className="card-body">
                            <p className="card-text">{slotRequest.details}</p>
                        </div>
                    </div>
                ))}
            </Container>


        </>
    );
}
