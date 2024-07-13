import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as TbIcons from 'react-icons/tb';
import { BsFillCaretDownFill } from 'react-icons/bs';
import AdminCourseManagement from './AdminCourseManagement';

const AdminInstituteManagement = () => {
    const [institutes, setInstitutes] = useState([]);
    const [expandedInstitute, setExpandedInstitute] = useState(null);
    const [selectedInstitute, setSelectedInstitute] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchInstitutes = async () => {
            try {
                const response = await axios.get('http://localhost:8070/api/admins/institutes/all', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('auth-token')}`
                    }
                });
                setInstitutes(response.data);
            } catch (error) {
                console.error('Error fetching institutes:', error);
            }
        };

        fetchInstitutes();
    }, []);

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


    const handleExpandInstitute = (instituteId) => {
        setExpandedInstitute(expandedInstitute === instituteId ? null : instituteId);
    };

    const handleDeleteInstitute = async (instituteId) => {
        try {
            await axios.delete(`http://localhost:8070/api/admins/institutes/${instituteId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth-token')}`
                }
            });
            setInstitutes(institutes.filter(institute => institute._id !== instituteId));
            closeConfirmation();
        } catch (error) {
            console.error('Error deleting institute:', error);
        }
    };

    const openModal = (institute) => {
        setSelectedInstitute(institute);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedInstitute(null);
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

    const filteredInstitutes = institutes.filter((institute) =>
        institute.instituteName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Institute Management</h2>
            <div className="d-flex justify-content-center">
                <input
                    type="text"
                    className="form-control mb-5 mt-5 w-50"
                    placeholder="Search institutes by name"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>
            <ul className="list-group">
                {filteredInstitutes.map(institute => (
                    <li key={institute._id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            {getRandomIcon(institute.instituteName)}
                            <span>{institute.instituteName}</span>
                            <button className="btn btn-link" onClick={() => handleExpandInstitute(institute._id)}>
                                <BsFillCaretDownFill />
                            </button>
                            {expandedInstitute === institute._id && (
                                <div className="mt-2">
                                    <p>Email: {institute.email}</p>
                                    <p>Courses:</p>
                                    <ul>
                                        {institute.courses.map(course => (
                                            <li key={course._id}>{course.title}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div>
                            <button className="btn btn-info me-2 rounded-5" onClick={() => openModal(institute)}>
                                Contact
                            </button>
                            <button className="btn btn-danger rounded-5" onClick={() => { setSelectedInstitute(institute); openConfirmation(); }}>
                                Remove
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {/* Modal */}
            {isModalOpen && selectedInstitute && (
                <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', zIndex: 1050 }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Contact Details</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <p className="card-text">
                                    <span className="fw-bold">Email: </span>&nbsp;&nbsp;&nbsp;{selectedInstitute.email}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Confirmation Modal */}
            {isConfirmationOpen && (
                <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', zIndex: 1060 }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirmation</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={closeConfirmation}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this institute?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeConfirmation}>
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => {
                                        handleDeleteInstitute(selectedInstitute._id);
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Modal backdrop */}
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
            {/* Confirmation Modal backdrop */}
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
            <AdminCourseManagement />
        </div>
    );
};

export default AdminInstituteManagement;
