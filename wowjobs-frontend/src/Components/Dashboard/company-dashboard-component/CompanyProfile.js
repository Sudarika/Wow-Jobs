import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CompanyProfileUpdate from './CompanyProfileUpdate';
import { Modal, Button } from 'react-bootstrap';
import { CgProfile } from "react-icons/cg";

const CompanyProfile = () => {
    const [company, setCompany] = useState(null);
    const [error, setError] = useState('');
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    useEffect(() => {
        const fetchCompanyProfile = async () => {
            try {
                const token = localStorage.getItem('auth-token');
                const response = await axios.get('http://localhost:8070/api/companies/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCompany(response.data);
            } catch (err) {
                setError(err.response.data.message);
            }
        };

        fetchCompanyProfile();
    }, []);

    const handleUpdateClick = () => {
        setShowUpdateModal(true);
    };

    const handleCloseModal = () => {
        setShowUpdateModal(false);
    };

    if (error) {
        return <p className="text-danger">Error: {error}</p>;
    }

    if (!company) {
        return <p className="text-info">Loading...</p>;
    }

    return (
        <div className="container mt-5">
            <div className="card border-0 rounded shadow">
                <div className="card-body">
                    <center><CgProfile style={{ fontSize: '70px', color: '#4CAF50' }} /></center>
                    <h2 className="card-title text-center mb-4"><span className="text-danger">Company</span><span
                        className="text-success">Profile</span></h2>
                    <div className="profile-details">
                        <div className="row mb-3">
                            <div className="col-sm-4 fs-5 text-muted">Company Name:</div>
                            <div className="col-sm-8">{company.companyName}</div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-4 fs-5 text-muted">Email:</div>
                            <div className="col-sm-8">{company.email}</div>
                        </div>
                        {company.profile && (
                            <>
                                <div className="row mb-3">
                                    <div className="col-sm-4 fs-5 text-muted">Description:</div>
                                    <div className="col-sm-8">{company.profile.description}</div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-4 fs-5 text-muted">Location:</div>
                                    <div className="col-sm-8">{company.profile.location}</div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-4 fs-5 text-muted">Industry:</div>
                                    <div className="col-sm-8">{company.profile.industry}</div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-4 fs-5 text-muted">Company Size:</div>
                                    <div className="col-sm-8">{company.profile.companySize}</div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-4 fs-5 text-muted">Website URL:</div>
                                    <div className="col-sm-8">{company.profile.websiteUrl}</div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="text-center mt-4">
                        <button className="btn btn-success btn-lg" onClick={handleUpdateClick}>
                            Update Profile
                        </button>
                    </div>
                </div>
            </div>

            <Modal show={showUpdateModal} onHide={handleCloseModal} centered size="xl">
                <Modal.Header closeButton className="bg-success text-light">
                    <Modal.Title>Update Company Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CompanyProfileUpdate onClose={handleCloseModal} />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CompanyProfile;
