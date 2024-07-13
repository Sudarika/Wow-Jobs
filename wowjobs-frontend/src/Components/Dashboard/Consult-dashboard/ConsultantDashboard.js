import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from "react-bootstrap";

const ConsultantDashboard = () => {
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [slots, setSlots] = useState([]);
    const [slotRequests, setSlotRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSlots();
    }, []);

    const fetchSlots = async () => {
        try {
            const consultantId = localStorage.getItem('consultantID');
            if (!consultantId) {
                alert('Consultant ID not found');
                return;
            }
            const response = await axios.get(`http://localhost:8070/api/consultants/${consultantId}/slots`);
            setSlots(response.data);
        } catch (error) {
            console.error('Error fetching slots:', error);
        }
    };

    const handleDeleteSlot = async (slotId) => {
        try {
            const consultantId = localStorage.getItem('consultantID');
            await axios.delete(`http://localhost:8070/api/consultants/${consultantId}/slots/${slotId}`);
            fetchSlots();
        } catch (error) {
            console.error('Error deleting slot:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const consultantId = localStorage.getItem('consultantID');
            await axios.post(`http://localhost:8070/api/consultants/${consultantId}/slots/add`, {
                date,
                startTime,
                endTime
            });
            fetchSlots();
            setDate('');
            setStartTime('');
            setEndTime('');
        } catch (error) {
            console.error('Error creating slot:', error);
        }
    };

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
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
            <div style={{ textAlign: 'center' }}>
                <h1><span style={{ color: '#dc3545' }}>Consultant </span><span style={{ color: '#28a745' }}> Dashboard</span></h1>
            </div>

            <div style={{ backgroundColor: '#f5f5f5', borderRadius: '10px', padding: '20px', marginTop: '30px' }}>
                <div style={{ width: '50%', margin: '0 auto', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', padding: '20px' }}>
                    <h3 style={{ marginBottom: '20px' }}>Slot Requests</h3>
                    <p style={{ fontSize: '24px', color: '#dc3545' }}>{slotRequests.length}</p>
                </div>

                {/* Display Slot Requests */}
                <Container style={{ marginTop: '30px' }}>
                    <h2 style={{ marginBottom: '20px', color: '#dc3545' }}>New Slot Requests</h2>
                    {slotRequests.map(slotRequest => (
                        <div key={slotRequest._id} style={{ boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '10px', marginBottom: '20px' }}>
                            <div style={{ padding: '15px' }}>
                                <p style={{ marginBottom: '0' }}>{slotRequest.details}</p>
                            </div>
                        </div>
                    ))}
                </Container>
            </div>

            <div className="row" style={{ backgroundColor: '#f5f5f5', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', padding: '20px', marginTop: '30px', marginBottom: '50px' }}>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Create Slot</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="dateInput" className="form-label">Date:</label>
                                    <input type="date" id="dateInput" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="startTimeInput" className="form-label">Start Time:</label>
                                    <input type="time" id="startTimeInput" className="form-control" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="endTimeInput" className="form-label">End Time:</label>
                                    <input type="time" id="endTimeInput" className="form-control" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                                </div>
                                <button type="submit" className="btn btn-primary">Create Slot</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Slots</h2>
                            <ul className="list-group">
                                {slots.map((slot) => (
                                    <li key={slot._id} className="list-group-item">
                                        Date: {slot.date}, Start Time: {slot.startTime}, End Time: {slot.endTime}
                                        <button onClick={() => handleDeleteSlot(slot._id)} className="btn btn-danger" style={{ marginLeft: '20px' }} >Delete</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsultantDashboard;
