import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { CgProfile } from "react-icons/cg";

const AdminUserManagement = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState('');
    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8070/api/users/all');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleViewUser = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleDeleteUser = async (userId) => {
        setUserToDelete(userId);
        setDeleteConfirmationModal(true);
    };

    const confirmDeleteUser = async () => {
        try {
            const response = await axios.delete(`http://localhost:8070/api/admins/users/${userToDelete}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth-token')}`
                }
            });
            if (response.status === 200) {
                setUsers(users.filter(user => user._id !== userToDelete));
                alert("User Deleted !")
            } else {
                setError('Error deleting user. Please try again later.');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            setError('Error deleting user. Please try again later.');
        } finally {
            setDeleteConfirmationModal(false);
            setUserToDelete(null);
        }
    };

    const cancelDeleteUser = () => {
        setDeleteConfirmationModal(false);
        setUserToDelete(null);
    };

    const filteredUsers = users.filter(user =>
        user.profile.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.profile.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mt-5">
            <div className="row align-content-between">
                <div className="col">
                    <h3 className="mb-4 mx-3">User List</h3>
                </div>
                <div className="col">
                    <input type="text"
                           className="form-control w-75 rounded-5 "
                           placeholder="Search User by name"
                           value={searchQuery}
                           onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <div className="col">

                </div>
            </div>
            <div className="row">
                {filteredUsers.map((user, index) => (
                    <div key={user._id} className="col-md-6">
                        <div className="rounded-5 shadow p-3 m-3 d-flex justify-content-between align-items-center">
                            <div>
                                <CgProfile className="fs-2 me-3" /><span>{user.profile.firstName} {user.profile.lastName}</span>
                            </div>
                            <div>
                                <button className="btn btn-info rounded-5 me-2" onClick={() => handleViewUser(user)}>
                                    View
                                </button>
                                <button className="btn btn-danger rounded-5" onClick={() => handleDeleteUser(user._id)}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedUser && (
                        <>
                            <p><strong>Name:</strong> {selectedUser.profile.firstName} {selectedUser.profile.lastName}</p>
                            <p><strong>Email:</strong> {selectedUser.email}</p>
                            <hr />
                            <p><strong>Title:</strong> {selectedUser.profile.title}</p>
                            <p><strong>Company:</strong> {selectedUser.profile.company}</p>
                            <p><strong>Location:</strong> {selectedUser.profile.location}</p>
                            <p><strong>Bio:</strong> {selectedUser.profile.bio}</p>
                            <hr />
                            <p><strong>Education:</strong></p>
                            <ul>
                                {selectedUser.profile.education.map(edu => (
                                    <li key={edu._id}>
                                        {edu.degree} in {edu.fieldOfStudy} from {edu.institution}, {edu.startYear} - {edu.endYear}
                                    </li>
                                ))}
                            </ul>
                            <hr />
                            <p><strong>Skills:</strong> {selectedUser.profile.skills.join(', ')}</p>
                            <hr />
                            <p><strong>Contact:</strong></p>
                            <ul>
                                <li><strong>Phone:</strong> {selectedUser.contact.phone}</li>
                                <li><strong>Address:</strong> {selectedUser.contact.address}</li>
                                <li><strong>LinkedIn:</strong> {selectedUser.contact.linkedIn}</li>
                                <li><strong>Twitter:</strong> {selectedUser.contact.twitter}</li>
                            </ul>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={deleteConfirmationModal} onHide={cancelDeleteUser}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this user?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelDeleteUser}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDeleteUser}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            {error && <p className="text-danger mt-3">{error}</p>}
        </div>
    );
};

export default AdminUserManagement;
