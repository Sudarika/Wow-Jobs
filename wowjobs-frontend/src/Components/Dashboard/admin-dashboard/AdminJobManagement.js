import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminJobManagement = () => {
    const [jobs, setJobs] = useState([]);
    const [employerNames, setEmployerNames] = useState({});
    const [selectedJob, setSelectedJob] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:8070/api/admins/jobs', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
                    },
                });
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, []);

    useEffect(() => {
        const fetchEmployerName = async (employerId) => {
            try {
                const response = await axios.get(`http://localhost:8070/api/admins/companies/${employerId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
                    },
                });
                setEmployerNames(prevState => ({
                    ...prevState,
                    [employerId]: response.data.companyName
                }));
            } catch (error) {
                console.error(`Error fetching company details for employer id ${employerId}:`, error);
            }
        };

        jobs.forEach(job => {
            if (!employerNames[job.employer]) {
                fetchEmployerName(job.employer);
            }
        });
    }, [jobs, employerNames]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString();
    };

    const handleEditClick = (job) => {
        setSelectedJob(job);
        setShowEditModal(true);
    };

    const handleViewClick = async (jobId) => {
        try {
            const response = await axios.get(`http://localhost:8070/api/admins/jobs/${jobId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
                },
            });
            setSelectedJob(response.data);
            setShowViewModal(true);
        } catch (error) {
            console.error('Error fetching job details:', error);
        }
    };

    const handleSaveChanges = async () => {
        try {
            const response = await axios.put(`http://localhost:8070/api/admins/jobs/${selectedJob._id}`, selectedJob, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
                },
            });
            console.log('Job updated:', response.data);
            const updatedJobs = jobs.map(job => job._id === selectedJob._id ? response.data : job);
            setJobs(updatedJobs);
            alert("Job Updated!");
            setShowEditModal(false);
        } catch (error) {
            console.error('Error updating job:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Job Management</h2>
            <div className="row">
                {jobs.map(job => (
                    <div key={job._id} className="col-md-6 mb-3">
                        <div className="card shadow p-3">
                            <h5 className="card-title">{job.title}</h5>
                            <p className="card-text">
                                <strong>Employer:</strong> {employerNames[job.employer] || 'Loading...'}
                            </p>
                            <p className="card-text">
                                <strong>Location:</strong> {job.location}
                            </p>
                            <p className="card-text">
                                <strong>Date:</strong> {formatDate(job.timestamp)}
                            </p>
                            <p className="card-text">
                                <strong>Time:</strong> {formatTime(job.timestamp)}
                            </p>
                            <button className="btn btn-primary me-2" onClick={() => handleViewClick(job._id)}>View</button>
                            <button className="btn btn-primary" onClick={() => handleEditClick(job)}>Edit</button>
                        </div>
                    </div>
                ))}
            </div>

            {showViewModal && selectedJob && (
                <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">View Job</h5>
                                <button type="button" className="btn-close" onClick={() => setShowViewModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <h5>{selectedJob.title}</h5>
                                <p><strong>Description:</strong> {selectedJob.description}</p>
                                <p><strong>Location:</strong> {selectedJob.location}</p>
                                <p><strong>Industry:</strong> {selectedJob.industry}</p>
                                <p><strong>Job Type:</strong> {selectedJob.jobType}</p>
                                <p><strong>Application Instructions:</strong> {selectedJob.applicationInstructions}</p>
                                <p><strong>Requirements:</strong> {selectedJob.requirements.join(', ')}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowViewModal(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showEditModal && selectedJob && (
                <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Job</h5>
                                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="title" value={selectedJob.title} onChange={(e) => setSelectedJob({ ...selectedJob, title: e.target.value })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <textarea className="form-control" id="description" value={selectedJob.description} onChange={(e) => setSelectedJob({ ...selectedJob, description: e.target.value })}></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="location" className="form-label">Location</label>
                                        <input type="text" className="form-control" id="location" value={selectedJob.location} onChange={(e) => setSelectedJob({ ...selectedJob, location: e.target.value })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="industry" className="form-label">Industry</label>
                                        <input type="text" className="form-control" id="industry" value={selectedJob.industry} onChange={(e) => setSelectedJob({ ...selectedJob, industry: e.target.value })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="jobType" className="form-label">Job Type</label>
                                        <input type="text" className="form-control" id="jobType" value={selectedJob.jobType} onChange={(e) => setSelectedJob({ ...selectedJob, jobType: e.target.value })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="applicationInstructions" className="form-label">Application Instructions</label>
                                        <textarea className="form-control" id="applicationInstructions" value={selectedJob.applicationInstructions} onChange={(e) => setSelectedJob({ ...selectedJob, applicationInstructions: e.target.value })}></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="requirements" className="form-label">Requirements</label>
                                        <textarea className="form-control" id="requirements" value={selectedJob.requirements.join('\n')} onChange={(e) => setSelectedJob({ ...selectedJob, requirements: e.target.value.split('\n') })}></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminJobManagement;
