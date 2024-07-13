import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsFillTrashFill } from 'react-icons/bs';

const AdminShowConsults = () => {
    const [consultants, setConsultants] = useState([]);

    useEffect(() => {
        const fetchConsultants = async () => {
            try {
                const response = await axios.get('http://localhost:8070/api/admins/consultants/all', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('auth-token')}`
                    }
                });
                setConsultants(response.data);
            } catch (error) {
                console.error('Error fetching consultants:', error);
            }
        };

        fetchConsultants();
    }, []);

    const handleDeleteConsultant = async (consultantId) => {
        try {
            await axios.delete(`http://localhost:8070/api/admins/consultants/${consultantId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth-token')}`
                }
            });
            setConsultants(consultants.filter(consultant => consultant._id !== consultantId));
        } catch (error) {
            console.error('Error deleting consultant:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Consultant <span className="text-danger"> Management</span></h2>
            {consultants.map(consultant => (
                <div key={consultant._id} className=" mb-3">
                    <div className="card-body mx-3 rounded-5 shadow p-3">
                        <h5 className="card-title mb-3">{consultant.firstName} {consultant.lastName}</h5>
                        <p className="card-text">Email: {consultant.email}</p>
                        <p className="card-text">Bio: {consultant.profile.bio}</p>
                        <p className="card-text">Expertise: {consultant.profile.expertise.join(', ')}</p>
                        <p className="card-text">Experience:</p>
                        <ul>
                            {consultant.profile.experience.map(exp => (
                                <li key={exp._id}>
                                    Company: {exp.company}, Position: {exp.position}, Duration: {exp.duration}
                                </li>
                            ))}
                        </ul>
                        <button className="btn btn-danger" onClick={() => handleDeleteConsultant(consultant._id)}>
                            <BsFillTrashFill/> Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminShowConsults;
