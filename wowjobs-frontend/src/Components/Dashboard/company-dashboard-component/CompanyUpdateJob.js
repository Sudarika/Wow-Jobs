// CompanyUpdateJob.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompanyUpdateJob = ({ job, onClose }) => {
    const [jobData, setJobData] = useState({
        title: '',
        description: '',
        requirements: '',
        applicationInstructions: '',
        location: '',
        industry: '',
        jobType: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (job) {
            setJobData(job);
            setLoading(false);
        }
    }, [job]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobData({ ...jobData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('auth-token');
            await axios.put(`http://localhost:8070/api/companies/jobs/${job._id}`, jobData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            onClose();
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-danger">Error: {error}</p>;
    }

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <h2>Update Job</h2>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={jobData.title} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" value={jobData.description} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="requirements" className="form-label">Requirements</label>
                    <input type="text" className="form-control" id="requirements" name="requirements" value={jobData.requirements} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="applicationInstructions" className="form-label">Application Instructions</label>
                    <textarea className="form-control" id="applicationInstructions" name="applicationInstructions" value={jobData.applicationInstructions} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input type="text" className="form-control" id="location" name="location" value={jobData.location} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="industry" className="form-label">Industry</label>
                    <input type="text" className="form-control" id="industry" name="industry" value={jobData.industry} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="jobType" className="form-label">Job Type</label>
                    <input type="text" className="form-control" id="jobType" name="jobType" value={jobData.jobType} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Update Job</button>
            </form>
        </div>
    );
};

export default CompanyUpdateJob;
