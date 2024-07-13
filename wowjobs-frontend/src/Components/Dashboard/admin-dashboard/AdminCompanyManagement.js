import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as TbIcons from 'react-icons/tb';
import AdminJobManagement from "./AdminJobManagement";

const AdminCompanyManagement = () => {
    const [companies, setCompanies] = useState([]);
    const [activeList, setActiveList] = useState('companies');
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/api/admins/${activeList}/all`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
                    },
                });
                setCompanies(response.data);
            } catch (error) {
                console.error(`Error fetching ${activeList}:`, error);
            }
        };

        fetchCompanies();
    }, [activeList]);

    const getRandomIcon = (companyName) => {
        const iconMap = {
            A: ['TbCircleLetterA', 'TbHexagonLetterA', 'TbSquareLetterA', 'TbSquareRoundedLetterA', 'TbLetterA'],
            B: ['TbCircleLetterB', 'TbHexagonLetterB', 'TbSquareLetterB', 'TbSquareRoundedLetterB', 'TbLetterB'],
            C: ['TbCircleLetterC', 'TbHexagonLetterC', 'TbSquareLetterC', 'TbSquareRoundedLetterC', 'TbLetterC'],
            D: ['TbCircleLetterD', 'TbHexagonLetterD', 'TbSquareLetterD', 'TbSquareRoundedLetterD', 'TbLetterD'],
            E: ['TbCircleLetterE', 'TbHexagonLetterE', 'TbSquareLetterE', 'TbSquareRoundedLetterE', 'TbLetterE'],
            F: ['TbCircleLetterF', 'TbHexagonLetterF', 'TbSquareLetterF', 'TbSquareRoundedLetterF', 'TbLetterF'],
            G: ['TbCircleLetterG', 'TbHexagonLetterG', 'TbSquareLetterG', 'TbSquareRoundedLetterG', 'TbLetterG'],
            H: ['TbCircleLetterH', 'TbHexagonLetterH', 'TbSquareLetterH', 'TbSquareRoundedLetterH', 'TbLetterH'],
            I: ['TbCircleLetterI', 'TbHexagonLetterI', 'TbSquareLetterI', 'TbSquareRoundedLetterI', 'TbLetterI'],
            J: ['TbCircleLetterJ', 'TbHexagonLetterJ', 'TbSquareLetterJ', 'TbSquareRoundedLetterJ', 'TbLetterJ'],
            K: ['TbCircleLetterK', 'TbHexagonLetterK', 'TbSquareLetterK', 'TbSquareRoundedLetterK', 'TbLetterK'],
            L: ['TbCircleLetterL', 'TbHexagonLetterL', 'TbSquareLetterL', 'TbSquareRoundedLetterL', 'TbLetterL'],
            M: ['TbCircleLetterM', 'TbHexagonLetterM', 'TbSquareLetterM', 'TbSquareRoundedLetterM', 'TbLetterM'],
            N: ['TbCircleLetterN', 'TbHexagonLetterN', 'TbSquareLetterN', 'TbSquareRoundedLetterN', 'TbLetterN'],
            O: ['TbCircleLetterO', 'TbHexagonLetterO', 'TbSquareLetterO', 'TbSquareRoundedLetterO', 'TbLetterO'],
            P: ['TbCircleLetterP', 'TbHexagonLetterP', 'TbSquareLetterP', 'TbSquareRoundedLetterP', 'TbLetterP'],
            Q: ['TbCircleLetterQ', 'TbHexagonLetterQ', 'TbSquareLetterQ', 'TbSquareRoundedLetterQ', 'TbLetterQ'],
            R: ['TbCircleLetterR', 'TbHexagonLetterR', 'TbSquareLetterR', 'TbSquareRoundedLetterR', 'TbLetterR'],
            S: ['TbCircleLetterS', 'TbHexagonLetterS', 'TbSquareLetterS', 'TbSquareRoundedLetterS', 'TbLetterS'],
            T: ['TbCircleLetterT', 'TbHexagonLetterT', 'TbSquareLetterT', 'TbSquareRoundedLetterT', 'TbLetterT'],
            U: ['TbCircleLetterU', 'TbHexagonLetterU', 'TbSquareLetterU', 'TbSquareRoundedLetterU', 'TbLetterU'],
            V: ['TbCircleLetterV', 'TbHexagonLetterV', 'TbSquareLetterV', 'TbSquareRoundedLetterV', 'TbLetterV'],
            W: ['TbCircleLetterW', 'TbHexagonLetterW', 'TbSquareLetterW', 'TbSquareRoundedLetterW', 'TbLetterW'],
            X: ['TbCircleLetterX', 'TbHexagonLetterX', 'TbSquareLetterX', 'TbSquareRoundedLetterX', 'TbLetterX'],
            Y: ['TbCircleLetterY', 'TbHexagonLetterY', 'TbSquareLetterY', 'TbSquareRoundedLetterY', 'TbLetterY'],
            Z: ['TbCircleLetterZ', 'TbHexagonLetterZ', 'TbSquareLetterZ', 'TbSquareRoundedLetterZ', 'TbLetterZ'],
        };

        const firstLetter = companyName.charAt(0).toUpperCase();
        const iconsForLetter = iconMap[firstLetter];

        if (iconsForLetter) {
            const randomIndex = Math.floor(Math.random() * iconsForLetter.length);
            const iconName = iconsForLetter[randomIndex];
            const IconComponent = TbIcons[iconName];
            return <IconComponent className="fs-1" />;
        } else {
            return null;
        }
    };

    const handleDeleteItem = async (itemId) => {
        try {
            if (selectedCompany) {
                await axios.delete(`http://localhost:8070/api/admins/${activeList}/${itemId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
                    },
                });
                setCompanies(companies.filter((item) => item._id !== itemId));
                alert('Company Deleted');
            } else {
                console.error('No company selected');
            }
        } catch (error) {
            console.error(`Error deleting ${activeList}:`, error);
        }
    };

    const openModal = (company) => {
        setSelectedCompany(company);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedCompany(null);
        setIsModalOpen(false);
    };

    const openConfirmation = () => {
        setIsConfirmationOpen(true);
    };

    const closeConfirmation = () => {
        setIsConfirmationOpen(false);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredCompanies = companies.filter((company) =>
        company.companyName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mt-5">
            <div className="mb-3">
                <center>
                    <button
                        className={`btn ${
                            activeList === 'companies' ? 'btn-info rounded-5 text-light' : 'btn-outline-info rounded-5'
                        }`}
                        onClick={() => setActiveList('companies')}
                    >
                        Company List
                    </button>
                    &nbsp; &nbsp; &nbsp;
                    <button
                        className={`btn ${
                            activeList === 'jobs' ? 'btn-info rounded-5 text-light' : 'btn-outline-info rounded-5'
                        }`}
                        onClick={() => setActiveList('jobs')}
                    >
                        Job List
                    </button>
                </center>
            </div>
            <div className="d-flex justify-content-center">
                <input
                    type="text"
                    className="form-control mb-5 mt-5 w-50"
                    placeholder="Search companies by name"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>
            <div className="row">
                {filteredCompanies.map((item, index) => (
                    <div key={item._id} className="col-md-6 mb-3">
                        <div className="mx-3">
                            {activeList === 'companies' ? (
                                <>
                                    <div className="row">
                                        <div className="col card shadow rounded-5 p-3 ">
                                            <div className="row">
                                                <div className="col">
                                                    {getRandomIcon(item.companyName)}
                                                    <span className="fw-bold fs-5 mx-3">{item.companyName}</span>
                                                </div>
                                                <div className="col justify-content-end">
                                                    <button className="btn btn-primary rounded-5" onClick={() => openModal(item)}>
                                                        Contact
                                                    </button>
                                                    &nbsp;
                                                    &nbsp;
                                                    &nbsp;
                                                    <button className="btn btn-danger rounded-5" onClick={() => { setSelectedCompany(item); openConfirmation(); }}>
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : null}
                        </div>
                    </div>
                ))}
            </div>
            {/* Modal */}
            {isModalOpen && selectedCompany && (
                <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', zIndex: 1050 }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Contact Details</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <p className="card-text">
                                    <span className="fw-bold">Email: </span>&nbsp;&nbsp;&nbsp;{selectedCompany.email}
                                </p>
                                <p className="card-text">
                                    <span className="fw-bold">Description: </span>&nbsp;&nbsp;&nbsp;{selectedCompany.profile.description}
                                </p>
                                <p className="card-text">
                                    <span className="fw-bold">Location: </span>&nbsp;&nbsp;&nbsp;{selectedCompany.profile.location}
                                </p>
                                <p className="card-text">
                                    <span className="fw-bold">Industry: </span>&nbsp;&nbsp;&nbsp;{selectedCompany.profile.industry}
                                </p>
                                <p className="card-text">
                                    <span className="fw-bold">Company Size: </span>&nbsp;&nbsp;&nbsp;{selectedCompany.profile.companySize}
                                </p>
                                <p className="card-text">
                                    <span className="fw-bold">Website: </span>&nbsp;&nbsp;&nbsp;{selectedCompany.profile.websiteUrl}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isModalOpen && (
                <div
                    className="modal-backdrop fade show"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1040,
                    }}
                ></div>
            )}

            {isConfirmationOpen && (
                <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', zIndex: 1060 }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirmation</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={closeConfirmation}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this company?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeConfirmation}>
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => {
                                        handleDeleteItem(selectedCompany._id);
                                        closeConfirmation();
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isConfirmationOpen && (
                <div
                    className="modal-backdrop fade show"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1050,
                    }}
                ></div>
            )}
            {activeList === 'jobs' && <AdminJobManagement />}
        </div>
    );
};

export default AdminCompanyManagement;
