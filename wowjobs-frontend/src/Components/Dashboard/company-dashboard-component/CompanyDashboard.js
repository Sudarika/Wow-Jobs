import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import CompanyProfile from '../../../Components/Dashboard/company-dashboard-component/CompanyProfile';
import CompanyJobs from '../../../Components/Dashboard/company-dashboard-component/CompanyJobs';
import CompanyCreateJobs from '../../../Components/Dashboard/company-dashboard-component/CompanyCreateJobs';
import img1 from '../../../assets/1.png';
import img2 from '../../../assets/4.png';
import img3 from '../../../assets/2.png';
import img4 from '../../../assets/3.png';

const CompanyDashboardComponent = () => {
    const [companyName, setCompanyName] = useState('');
    const [activeComponent, setActiveComponent] = useState('dashboard');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompanyProfile = async () => {
            try {
                const token = localStorage.getItem('auth-token');
                const response = await axios.get('http://localhost:8070/api/companies/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCompanyName(response.data.companyName);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCompanyProfile();
    }, []);

    const handleButtonClick = (component) => {
        setActiveComponent(component);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Hello, <span className="text-success">{companyName}</span></h1>
            <div className="row justify-content-center">
                <DashboardItem image={img1} alt="CompanyDashboardAppliers" buttonText="Profile" onClick={() => handleButtonClick("profile")} />
                <DashboardItem image={img2} alt="CompanyAddJob" buttonText="Add Job" onClick={() => handleButtonClick("postJob")} />
                <DashboardItem image={img3} alt="CompanyJobList" buttonText="Job List" onClick={() => handleButtonClick("jobs")} />
                <DashboardItem image={img4} alt="CompanyMessages" buttonText="Messages" onClick={() => handleButtonClick("messages")} />
            </div>
            <Modal show={showModal} onHide={handleCloseModal} centered size="xl" dialogClassName="modal-100vh">
                <Modal.Header closeButton>
                    <Modal.Title>{activeComponent}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {activeComponent === "profile" && <CompanyProfile />}
                    {activeComponent === "jobs" && <CompanyJobs />}
                    {activeComponent === "postJob" && <CompanyCreateJobs />}
                </Modal.Body>
            </Modal>
        </div>
    );
};

const DashboardItem = ({ image, alt, buttonText, onClick }) => {
    return (
        <div className="col-md-3 text-center mt-5">
            <div style={{
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
                padding: '20px',
            }}>
                <img
                    src={image}
                    alt={alt}
                    className="img-fluid mb-3"
                    style={{
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: '5px',
                    }}
                />
                <button
                    className="btn btn-primary btn-block"
                    style={{
                        backgroundColor: '#4CAF50',
                        borderColor: '#4CAF50',
                        borderRadius: '5px',
                    }}
                    onClick={onClick}
                >
                    <span style={{
                        fontWeight: 'bold',
                    }}>
                        {buttonText}
                    </span>
                </button>
            </div>
        </div>
    );
};

export default CompanyDashboardComponent;
