import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BsFillBuildingsFill } from "react-icons/bs";

const UserGetAllJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [allJobs, setAllJobs] = useState([]);
    const [error, setError] = useState('');
    const [titleQuery, setTitleQuery] = useState('');
    const [locationQuery, setLocationQuery] = useState('');
    const [industryQuery, setIndustryQuery] = useState('');
    const [jobTypeQuery, setJobTypeQuery] = useState('');
    const [searchClicked, setSearchClicked] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [fullName, setFullName] = useState('');
    const [fullNameError, setFullNameError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [cv, setCV] = useState(null);
    const [cvURLError, setCVURLError] = useState('');
    const [cl, setCL] = useState(null);
    const [clURLError, setCLURLError] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('auth-token');
            const response = await axios.get('http://localhost:8070/api/users/jobs', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setJobs(response.data);
            setAllJobs(response.data);
        } catch (err) {
            setError(err.response.data);
        }
    };

    const validateName = (name) => {
        const regex = /^[a-zA-Z\s]*$/;
        return regex.test(name);
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleShowMore = (job) => {
        setSelectedJob(job);
        setShowModal(true);
    };

    const handleCVUpload = (file) => {
        setCV(file);
    };

    const handleCLUpload = (file) => {
        setCL(file);
    };

    const handleApply = async () => {
        try {
            if (!selectedJob) {
                window.alert('Please select a job to apply.');
                return;
            }
            const token = localStorage.getItem('auth-token');

            if (!validateName(fullName)) {
                setFullNameError('Please enter a valid name');
                return;
            }
            setFullNameError('');

            if (!validateEmail(email)) {
                setEmailError('Please enter a valid email address');
                return;
            }
            setEmailError('');

            if (!cv) {
                setCVURLError('Please upload your CV');
                return;
            }
            setCVURLError('');

            if (!cl) {
                setCLURLError('Please upload your cover letter');
                return;
            }
            setCLURLError('');

            const formData = new FormData();
            formData.append('fullName', fullName);
            formData.append('email', email);
            formData.append('cv', cv);
            formData.append('cl', cl);
            formData.append('jobId', selectedJob._id); // Include the selected job's ID

            // Upload files to userController.uploadFiles function
            await axios.post('http://localhost:8070/api/files/upload-files', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Submit application to the selected job
            await axios.post(`http://localhost:8070/api/users/jobs/${selectedJob._id}/apply`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setShowModal(false);
            window.alert('Application submitted successfully');
        } catch (err) {
            console.error('Error submitting application:', err);
            if (err.response) {
                console.error('Response status:', err.response.status);
                console.error('Response data:', err.response.data);
            }
            window.alert('Error submitting application');
        }
    };

    const handleSearch = () => {
        setSearchClicked(true);
        const filteredJobs = allJobs.filter(job => {
            return (
                job.title.toLowerCase().includes(titleQuery.toLowerCase()) &&
                job.location.toLowerCase().includes(locationQuery.toLowerCase()) &&
                job.industry.toLowerCase().includes(industryQuery.toLowerCase()) &&
                job.jobType.toLowerCase().includes(jobTypeQuery.toLowerCase())
            );
        });
        setJobs(filteredJobs);
    };

    const handleShowAll = () => {
        setSearchClicked(false);
        setJobs(allJobs);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-success">Find Your <span className="text-danger">Dream Job</span></h2>
            <div className="row mb-5">
                <div className="col">
                    <h6>Search by Title</h6>
                    <input
                        type="text"
                        className="form-control rounded-5"
                        placeholder="Search by Title"
                        value={titleQuery}
                        onChange={(e) => setTitleQuery(e.target.value)}
                    />
                </div>
                <div className="col">
                    <h6>Search by Location</h6>
                    <input
                        type="text"
                        className="form-control rounded-5"
                        placeholder="Search by Location"
                        value={locationQuery}
                        onChange={(e) => setLocationQuery(e.target.value)}
                    />
                </div>
                <div className="col">
                    <h6>Search by Industry</h6>
                    <input
                        type="text"
                        className="form-control rounded-5"
                        placeholder="Search by Industry"
                        value={industryQuery}
                        onChange={(e) => setIndustryQuery(e.target.value)}
                    />
                </div>
                <div className="col">
                    <h6>Search by Job Type</h6>
                    <input
                        type="text"
                        className="form-control rounded-5"
                        placeholder="Search by Job Type"
                        value={jobTypeQuery}
                        onChange={(e) => setJobTypeQuery(e.target.value)}
                    />
                </div>
                <div className="row">
                    <center>
                        <button className="btn btn-success rounded-5 align-self-center w-25 mt-4"
                                onClick={handleSearch}>Search
                        </button>
                    </center>
                </div>
            </div>

            <hr/>

            <div className="row mb-4">
                <div className="col-10">
                    <h2 className="mb-4 d-inline">Recommended <span className="text-success">Jobs</span></h2>
                </div>
                <div className="col">
                    <button className="btn btn-dark rounded-5"
                            onClick={handleShowAll}>Show All
                    </button>
                </div>
            </div>

            <div className="row">
                {jobs.map(job => (
                    <div key={job._id} className="col-4">
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-2">
                                        <BsFillBuildingsFill className="align-self-center text-center mt-2"
                                                             style={{fontSize: '40px'}}/>
                                    </div>
                                    <div className="col">
                                        <h5>{job.employer ? job.employer.companyName : 'Unknown Employer'}</h5>
                                        <div>{job.location}</div>
                                    </div>
                                </div>
                                <h4 className="mt-3 mb-2">{job.title}</h4>
                                <p className="card-text">{job.jobType}</p>
                                <p className="card-text">Description: {job.description}</p>
                                <button
                                    className="text-light btn-success rounded-5 mb-3 float-end"
                                    onClick={() => handleShowMore(job)}
                                >
                                    Show More
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {error && <p className="text-danger">{error}</p>}

            {/* Modal */}
            {showModal && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Job Application</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="fullName" className="form-label">Full Name</label>
                                    <input type="text" className={`form-control ${fullNameError ? 'is-invalid' : ''}`} id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                    {fullNameError && <div className="invalid-feedback">{fullNameError}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className={`form-control ${emailError ? 'is-invalid' : ''}`} id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    {emailError && <div className="invalid-feedback">{emailError}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cv" className="form-label">Upload CV</label>
                                    <input type="file" className={`form-control ${cvURLError ? 'is-invalid' : ''}`} id="cv" onChange={(e) => handleCVUpload(e.target.files[0])} />
                                    {cvURLError && <div className="invalid-feedback">{cvURLError}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cl" className="form-label">Upload Cover Letter</label>
                                    <input type="file" className={`form-control ${clURLError ? 'is-invalid' : ''}`} id="cl" onChange={(e) => handleCLUpload(e.target.files[0])} />
                                    {clURLError && <div className="invalid-feedback">{clURLError}</div>}
                                </div>
                            </div>
                            <button type="button" className="btn btn-success" onClick={handleApply}>Upload Docs</button>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleApply}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserGetAllJobs;
