import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsFillBuildingsFill, BsTrash } from "react-icons/bs";

const UserGetAppliedJobs = () => {
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem('auth-token');
                const response = await axios.get('http://localhost:8070/api/users/jobs/applied', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setAppliedJobs(response.data);
            } catch (err) {
                setError(err.response.data);
            }
        }

        fetchData();
    }, []);

    const handleDeleteApplication = async (jobId) => {
        try {
            const token = localStorage.getItem('auth-token');
            await axios.delete(`http://localhost:8070/api/users/jobs/${jobId}/application`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAppliedJobs(prevAppliedJobs => prevAppliedJobs.filter(job => job._id !== jobId));
        } catch (err) {
            setError(err.response.data);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-success">Applied <span className="text-danger">Applications</span></h2>
            <div className="row">
                {appliedJobs.map(job => (
                    <div key={job._id} className="col-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-2">
                                        <BsFillBuildingsFill className="align-self-center text-center mt-2"
                                                             style={{fontSize: '40px'}}/>
                                    </div>
                                    <div className="col">
                                        <h5 className="">{job.employer ? job.employer.username : 'Unknown Employer'}</h5>
                                        <div className="card-text">{job.title}</div>
                                    </div>
                                </div>
                                <p className="card-text mt-3">{job.description}</p>
                                <p className="card-text"><strong>Status:</strong> Pending</p>
                                <button className="btn btn-danger" onClick={() => handleDeleteApplication(job._id)}>
                                    <BsTrash /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {error && <p className="text-danger">{error}</p>}
        </div>
    );
};

export default UserGetAppliedJobs;
