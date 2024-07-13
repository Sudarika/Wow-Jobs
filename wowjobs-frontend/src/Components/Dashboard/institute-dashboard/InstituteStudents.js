import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InstituteStudents = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchEnrolledStudents();
    }, []);

    const fetchEnrolledStudents = async () => {
        try {
            const token = localStorage.getItem('auth-token');
            const response = await axios.get('http://localhost:8070/api/institutes/enrolled-students', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching enrolled students:', error);
        }
    };

    const handleStudentClick = (student) => {
        setSelectedStudent(student);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedStudent(null);
        setShowModal(false);
    };

    return (
        <div>
            <h2>Institute Students</h2>
            <div className="row">
                {students.map(student => (
                    <div className="col-md-3 mb-3" key={student._id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{student.username}</h5>
                                <button className="btn btn-primary" onClick={() => handleStudentClick(student)}>View Details</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bootstrap Modal */}
            {showModal && (
                <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }} onClick={closeModal}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{selectedStudent && selectedStudent.username}</h5>
                                <button type="button" className="close" onClick={closeModal} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {selectedStudent && (
                                    <div>
                                        <p>Email: {selectedStudent.email}</p>
                                        <p>Profile: {selectedStudent.profile.firstName} {selectedStudent.profile.lastName}</p>
                                        <p>Education: {selectedStudent.profile.education[0].institution}</p>
                                        <p>Skills: {selectedStudent.profile.skills.join(', ')}</p>
                                        <p>Contact: {selectedStudent.contact.phone}</p>
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModal && <div className="modal-backdrop fade show"></div>}
        </div>
    );
};

export default InstituteStudents;
