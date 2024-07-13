import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminJobManagement = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [searchTitle, setSearchTitle] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:8070/api/admins/courses', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
                    },
                });
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const handleEditClick = (course) => {
        setSelectedCourse(course);
        setShowEditModal(true);
    };

    const handleDeleteClick = (course) => {
        setSelectedCourse(course);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirmation = async () => {
        try {
            await axios.delete(`http://localhost:8070/api/admins/courses/${selectedCourse._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
                },
            });
            setCourses(courses.filter(course => course._id !== selectedCourse._id));
            setShowDeleteModal(false);
            console.log('Course deleted successfully.');
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    const handleViewClick = (course) => {
        setSelectedCourse(course);
        setShowViewModal(true);
    };

    const handleSaveChanges = async () => {
        try {
            const response = await axios.put(`http://localhost:8070/api/admins/courses/${selectedCourse._id}`, selectedCourse, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
                },
            });
            console.log('Course updated:', response.data);
            const updatedCourses = courses.map(course => course._id === selectedCourse._id ? response.data : course);
            setCourses(updatedCourses);
            alert("Course Updated!");
            setShowEditModal(false);
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTitle.toLowerCase())
    );

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Course Management</h2>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by title"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                />
            </div>
            <div className="row">
                {filteredCourses.map(course => (
                    <div key={course._id} className="col-md-6 mb-3">
                        <div className="card shadow p-3">
                            <h5 className="card-title">{course.title}</h5>
                            <p className="card-text">
                                <strong>Description:</strong> {course.description}
                            </p>
                            <button className="btn btn-primary me-2 mt-2" onClick={() => handleEditClick(course)}>Edit</button>
                            <button className="btn btn-danger me-2 mt-2" onClick={() => handleDeleteClick(course)}>Delete</button>
                            <button className="btn btn-primary me-2 mt-2" onClick={() => handleViewClick(course)}>View</button>
                        </div>
                    </div>
                ))}
            </div>

            {showEditModal && selectedCourse && (
                <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Course</h5>
                                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="title" value={selectedCourse.title} onChange={(e) => setSelectedCourse({ ...selectedCourse, title: e.target.value })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <textarea className="form-control" id="description" value={selectedCourse.description} onChange={(e) => setSelectedCourse({ ...selectedCourse, description: e.target.value })}></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="institute" className="form-label">Institute</label>
                                        <input type="text" className="form-control" id="institute" value={selectedCourse.institute} onChange={(e) => setSelectedCourse({ ...selectedCourse, institute: e.target.value })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="syllabus" className="form-label">Syllabus</label>
                                        <textarea className="form-control" id="syllabus" value={selectedCourse.syllabus} onChange={(e) => setSelectedCourse({ ...selectedCourse, syllabus: e.target.value })}></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="enrollmentCriteria" className="form-label">Enrollment Criteria</label>
                                        <textarea className="form-control" id="enrollmentCriteria" value={selectedCourse.enrollmentCriteria} onChange={(e) => setSelectedCourse({ ...selectedCourse, enrollmentCriteria: e.target.value })}></textarea>
                                    </div>
                                    {/* Add fields for content here */}
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


            {showDeleteModal && selectedCourse && (
                <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Delete Course</h5>
                                <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this course?</p>
                                <p><strong>Title:</strong> {selectedCourse.title}</p>
                                <p><strong>Description:</strong> {selectedCourse.description}</p>
                                <p><strong>Instructor:</strong> {selectedCourse.instructor}</p>
                                <p><strong>Duration:</strong> {selectedCourse.duration}</p>
                                <p><strong>Price:</strong> ${selectedCourse.price}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={handleDeleteConfirmation}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showViewModal && selectedCourse && (
                <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">View Course</h5>
                                <button type="button" className="btn-close" onClick={() => setShowViewModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Title:</strong> {selectedCourse.title}</p>
                                <p><strong>Description:</strong> {selectedCourse.description}</p>
                                <p><strong>Institute:</strong> {selectedCourse.institute}</p>
                                <p><strong>Syllabus:</strong> {selectedCourse.syllabus}</p>
                                <p><strong>Enrollment Criteria:</strong> {selectedCourse.enrollmentCriteria}</p>
                                <p><strong>Content:</strong></p>
                                <ul>
                                    {selectedCourse.content.map(item => (
                                        <li key={item._id}>
                                            <strong>Topic:</strong> {item.topic}, <strong>URL:</strong> {item.url}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowViewModal(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminJobManagement;
