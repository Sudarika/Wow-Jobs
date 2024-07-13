import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {ImProfile} from "react-icons/im";
import {CgProfile} from "react-icons/cg";

const UserConsult = () => {
    const [consultants, setConsultants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedConsultant, setSelectedConsultant] = useState(null);
    const [consultantSlots, setConsultantSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [details, setDetails] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchConsultants = async () => {
            try {
                const response = await axios.get('http://localhost:8070/api/users/consultants');
                setConsultants(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching consultants:', error);
                setLoading(false);
            }
        };

        fetchConsultants();
    }, []);

    const openModal = async (consultantId) => {
        try {
            const response = await axios.get(`http://localhost:8070/api/users/consultants/${consultantId}`);
            setSelectedConsultant(response.data);
            setConsultantSlots(response.data.slots || []);
        } catch (error) {
            console.error('Error fetching consultant details:', error);
            setError('Error fetching consultant details. Please try again.');
        }
    };

    const handleRequestSlot = (slot) => {
        setSelectedSlot(slot);
        setDetails('');
        setMessage('');
        setError('');
    };

    const handleSlotRequestSubmit = async () => {
        try {
            const token = localStorage.getItem('auth-token');
            if (!token) {
                console.error('Authentication token not found');
                return;
            }

            if (!selectedSlot) {
                console.error('No slot selected');
                setError('No slot selected. Please try again.');
                return;
            }

            const requestData = {
                details: `Slot details: ${selectedSlot.date} - ${selectedSlot.startTime} to ${selectedSlot.endTime}`,
                message: message
            };

            const headers = {
                'Content-Type': 'application/json',
                'auth-token': token
            };

            const response = await axios.post(
                `http://localhost:8070/api/users/consultants/${selectedConsultant._id}/slot-request`,
                requestData,
                { headers }
            );

            if (response.status === 200) {
                console.log('Slot request sent successfully');
                alert('Slot request sent successfully');
            } else {
                console.error('Slot request failed with status:', response.status);
                setError('Slot request failed. Please try again.');
            }
        } catch (error) {
            console.error('Error sending slot request:', error);
            setError('Error sending slot request. Please try again.');
        }
    };


    return (
        <div className="container mt-5">

            <h1 className="text-center"><span className="text-danger">Consultants </span><span
                className="text-success"> Available</span></h1>

            <br/>
            <hr/>

            <div className="row mt-5">
                <div className="col">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="row">
                            {consultants.map(consultant => (
                                <div key={consultant._id} className="col-md-4">
                                    <div className="card m-3">
                                        <div className="card-body">
                                            <center><h5 className="card-title"><CgProfile />  {`${consultant.firstName} ${consultant.lastName}`}</h5></center>
                                            <p className="card-text">Expertise: {consultant.profile.expertise.join(', ')}</p>
                                            <p className="card-text">Experience: {consultant.profile.experience.map(exp => exp.position).join(', ')}</p>
                                            <button
                                                className="btn btn-success"
                                                onClick={() => openModal(consultant._id)}
                                                data-bs-toggle="modal"
                                                data-bs-target="#consultantModal"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Consultant Details */}
            <div className="modal fade" id="consultantModal" tabIndex="-1" aria-labelledby="consultantModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="consultantModalLabel">Consultant Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {selectedConsultant && (
                                <>
                                    <h5>{`${selectedConsultant.firstName} ${selectedConsultant.lastName}`}</h5>
                                    <p>Expertise: {selectedConsultant.profile.expertise.join(', ')}</p>
                                    <h6>Experience:</h6>
                                    <ul>
                                        {selectedConsultant.profile.experience.map(exp => (
                                            <li key={exp._id}>
                                                {`${exp.position} at ${exp.company} (${exp.duration})`}
                                            </li>
                                        ))}
                                    </ul>
                                    <h6>Available Slots:</h6>
                                    <ul>
                                        {consultantSlots.length > 0 ? (
                                            consultantSlots.map(slot => (
                                                <li key={slot._id}>
                                                    {slot && (
                                                        <>
                                                            {slot.date} - {slot.startTime} to {slot.endTime}
                                                            <button
                                                                className="btn btn-primary"
                                                                onClick={() => handleRequestSlot(slot)}
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#slotRequestModal"
                                                            >
                                                                Request Slot
                                                            </button>
                                                        </>
                                                    )}
                                                </li>
                                            ))
                                        ) : (
                                            <li><span className="text-danger fs-3 fw-bold">No</span><span
                                                className="text-dark fw-bold fs-5"> slots available</span></li>
                                        )}
                                    </ul>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Slot Request */}
            <div className="modal fade" id="slotRequestModal" tabIndex="-1" aria-labelledby="slotRequestModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="slotRequestModalLabel">Request Slot</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="details" className="form-label">Details</label>
                                <input type="text" className="form-control" id="details"
                                       value={selectedSlot ? `Slot details: ${selectedSlot.date} - ${selectedSlot.startTime} to ${selectedSlot.endTime}` : ''}
                                       disabled/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="message" className="form-label">Message</label>
                                <textarea className="form-control" id="message" rows="3" value={message}
                                          onChange={(e) => setMessage(e.target.value)}></textarea>
                            </div>
                            {error && <p className="text-danger">{error}</p>}
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSlotRequestSubmit}>Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <br/>
            <hr/>
            <br/>
        </div>
    );
};

export default UserConsult;
