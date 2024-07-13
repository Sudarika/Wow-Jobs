// UserRejectedJobs.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserRejectedJobs = () => {
    const [rejectedJobs, setRejectedJobs] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem('auth-token');
                const response = await axios.get('http://localhost:8070/api/users/jobs/rejected', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setRejectedJobs(response.data);
            } catch (err) {
                setError(err.response.data);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="container mt-5">
            <h4 className="mb-4 text-center text-success">Rejected Applications</h4>
            {rejectedJobs.length === 0 && <p className="text-center">No rejected applications found.</p>}
            {rejectedJobs.map(job => (
                <div key={job._id} className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">{job.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{job.employer ? job.employer.username : 'Unknown Employer'}</h6>
                        <p className="card-text">{job.description}</p>
                        <p className="card-text"><strong>Status:</strong> Rejected</p>
                    </div>
                </div>
            ))}
            {error && <p className="text-danger">{error}</p>}
        </div>
    );
};

export default UserRejectedJobs;
