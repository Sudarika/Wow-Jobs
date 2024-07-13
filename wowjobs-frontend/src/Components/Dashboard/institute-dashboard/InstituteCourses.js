import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';
import {RiDeleteBinLine} from 'react-icons/ri';

const InstituteCourses = () => {
    const [courses, setCourses] = useState([]);
    const [expandedCourse, setExpandedCourse] = useState(null);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courseData, setCourseData] = useState({
        title: '',
        description: '',
        syllabus: '',
        enrollmentCriteria: '',
        content: [{topic: '', url: ''}]
    });

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:8070/api/institutes/courses', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('auth-token')}`
                    }
                });
                setCourses(response.data);
            } catch (err) {
                setError(err.response.data.message);
            }
        };

        fetchCourses();
    }, []);

    const handleExpandCourse = (index) => {
        setExpandedCourse(expandedCourse === index ? null : index);
    };

    const handleUpdateClick = async (course) => {
        setSelectedCourse(course._id);
        setCourseData({
            title: course.title,
            description: course.description,
            syllabus: course.syllabus,
            enrollmentCriteria: course.enrollmentCriteria,
            content: course.content.map(item => ({...item}))
        });
        setShowModal(true);
    };

    const handleDeleteCourse = async (courseId) => {
        try {
            await axios.delete(`http://localhost:8070/api/institutes/courses/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth-token')}`
                }
            });
            const updatedCourses = courses.filter(course => course._id !== courseId);
            setCourses(updatedCourses);
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const handleBackdropClick = () => {
        setShowModal(false);
    };

    const handleChange = (e, index, field) => {
        const {value} = e.target;
        const updatedContent = [...courseData.content];
        updatedContent[index][field] = value;
        setCourseData(prevData => ({
            ...prevData,
            content: updatedContent
        }));
    };

    const addContentField = () => {
        setCourseData({...courseData, content: [...courseData.content, {topic: '', url: ''}]});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8070/api/institutes/courses/${selectedCourse}`, courseData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth-token')}`
                }
            });
            setShowModal(false);
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return (
        <>
            <div className="container mt-5">
                <h2 className="text-center mb-4">Institute Courses</h2>
                {courses.length > 0 ? (
                    <div>
                        {courses.map((course, index) => (
                            <div key={course._id} className="card mb-3">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5 className="card-title">{course.title}</h5>
                                        <div className="d-flex">
                                            <button className="btn btn-link me-3"
                                                    onClick={() => handleExpandCourse(index)}>
                                                {expandedCourse === index ? <IoIosArrowUp/> : <IoIosArrowDown/>}
                                            </button>
                                        </div>
                                    </div>
                                    {expandedCourse === index && (
                                        <>
                                            <p className="card-text">Description: {course.description}</p>
                                            <p className="card-text">Syllabus: {course.syllabus}</p>
                                            <p className="card-text">Enrollment
                                                Criteria: {course.enrollmentCriteria}</p>
                                            <p className="card-text">Content:</p>
                                            <ul className="list-group">
                                                {course.content.map((item, i) => (
                                                    <li key={i}
                                                        className="list-group-item">{item.topic}: {item.url}</li>
                                                ))}
                                            </ul>
                                            <button className="btn btn-primary mt-3"
                                                    onClick={() => handleUpdateClick(course)}>Update
                                            </button>
                                            <button className="btn btn-danger mt-3 mx-3"
                                                    onClick={() => handleDeleteCourse(course._id)}>
                                                <RiDeleteBinLine/>
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center">No courses found.</p>
                )}
                {error && <p className="mt-3 text-danger text-center">{error}</p>}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal fade show" tabIndex="-1" role="dialog" style={{display: 'block'}}
                     onClick={handleBackdropClick}>
                    <div className="modal-dialog" role="document" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update Course</h5>
                                <button type="button" className="close" aria-label="Close"
                                        onClick={() => setShowModal(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="title" name="title"
                                               value={courseData.title}
                                               onChange={(e) => setCourseData({...courseData, title: e.target.value})}
                                               required/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <textarea className="form-control" id="description" name="description"
                                                  value={courseData.description} onChange={(e) => setCourseData({
                                            ...courseData,
                                            description: e.target.value
                                        })} required/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="syllabus" className="form-label">Syllabus</label>
                                        <textarea className="form-control" id="syllabus" name="syllabus"
                                                  value={courseData.syllabus} onChange={(e) => setCourseData({
                                            ...courseData,
                                            syllabus: e.target.value
                                        })} required/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="enrollmentCriteria" className="form-label">Enrollment
                                            Criteria</label>
                                        <textarea className="form-control" id="enrollmentCriteria"
                                                  name="enrollmentCriteria" value={courseData.enrollmentCriteria}
                                                  onChange={(e) => setCourseData({
                                                      ...courseData,
                                                      enrollmentCriteria: e.target.value
                                                  })} required/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="content" className="form-label">Content</label>
                                        {courseData.content.map((content, index) => (
                                            <div key={index} className="row mb-3">
                                                <div className="col">
                                                    <input type="text" className="form-control" placeholder="Topic"
                                                           value={content.topic}
                                                           onChange={(e) => handleChange(e, index, 'topic')} required/>
                                                </div>
                                                <div className="col">
                                                    <input type="text" className="form-control" placeholder="URL"
                                                           value={content.url}
                                                           onChange={(e) => handleChange(e, index, 'url')} required/>
                                                </div>
                                            </div>
                                        ))}
                                        <button type="button" className="btn btn-secondary"
                                                onClick={addContentField}>Add Content
                                        </button>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Update Course</button>
                                    {error && <p className="mt-3 text-danger">{error}</p>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default InstituteCourses;
