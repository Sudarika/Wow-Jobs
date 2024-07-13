import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserGetAcceptedJobs = () => {
    const [acceptedJobs, setAcceptedJobs] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem('auth-token');
                const response = await axios.get('http://localhost:8070/api/users/jobs/accepted', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setAcceptedJobs(response.data);
            } catch (err) {
                setError(err.response.data);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="container mt-5">
            <h4 className="mb-4 text-center text-success">Accepted Applications</h4>
            {acceptedJobs.length === 0 && <p className="text-center">No accepted applications found.</p>}
            {acceptedJobs.map(job => (
                <div key={job._id} className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">{job.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{job.employer ? job.employer.username : 'Unknown Employer'}</h6>
                        <p className="card-text">{job.description}</p>
                        <p className="card-text"><strong>Status:</strong> Accepted</p>
                    </div>
                </div>
            ))}
            {error && <p className="text-danger">{error}</p>}
        </div>
    );
};

export default UserGetAcceptedJobs;
