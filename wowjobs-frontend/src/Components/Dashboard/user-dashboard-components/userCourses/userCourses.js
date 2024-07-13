import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import UserCourseList from "./userCourseList";
import UserCoursePageImg from '../../../../assets/UserCoursePage.png';

export default function UserCourses() {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("http://localhost:8070/api/users/courses/all", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("auth-token")}`
                    }
                });
                setCourses(response.data);
                setSearchResults(response.data); // Initialize search results with all courses
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        const fetchEnrolledCourses = async () => {
            try {
                const response = await axios.get("http://localhost:8070/api/users/courses/enrolled", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("auth-token")}`
                    }
                });
                setEnrolledCourses(response.data);
            } catch (error) {
                console.error("Error fetching enrolled courses:", error);
            }
        };

        fetchCourses();
        fetchEnrolledCourses();
    }, []);

    const handleViewCourse = (course) => {
        setSelectedCourse(course);
    };

    const handleCloseModal = () => {
        setSelectedCourse(null);
    };

    const handleSearch = () => {
        const filteredCourses = courses.filter(course =>
            course.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            course.description.toLowerCase().includes(searchKeyword.toLowerCase())
        );
        setSearchResults(filteredCourses);
    };

    const handleResetSearch = () => {
        setSearchKeyword('');
        setSearchResults(courses);
    };

    const handleEnroll = async (courseId) => {
        try {
            await axios.post(`http://localhost:8070/api/users/courses/enroll/${courseId}`, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("auth-token")}`
                }
            });
            setEnrolledCourses([...enrolledCourses, courseId]);
            handleCloseModal(); // Close modal after enrollment
        } catch (error) {
            console.error("Error enrolling in course:", error);
        }
    };

    return (
        <>
            <div className="row">
                {/* Left column */}
                <div className="col mt-2 mx-3 border rounded-5 shadow mt-5 p-4" style={{backgroundColor:'#f5f5f5'}}>
                    <div className="row">
                        <div className="text-success fs-2 fw-bold">Grow up your skills by online courses with e learning</div>
                    </div>
                    <img src={UserCoursePageImg} alt="image" className="mw-100 h-auto w-25 float-end"/>
                    <div className="row " style={{marginTop: '100px'}}>
                        <UserCourseList/>
                    </div>
                </div>

                {/* Right column */}
                <div className="col mt-5">
                    <div className="fs-2 fw-bold mt-5 mb-3 mx-3">Discover more</div>
                    <center>
                        <div className="fs-2 fw-bold">Select course</div>
                        <input
                            style={{ width: '300px', height: '50px' }}
                            type="text"
                            className="border-2 rounded-5"
                            placeholder="Enter course, keyword"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                        <br/>
                        <button className="btn btn-success mt-3" onClick={handleSearch}>Search</button>
                        <button className="btn btn-danger mt-3 ms-2" onClick={handleResetSearch}>Reset</button>
                    </center>

                    <div className="row" style={{ marginTop: "100px" }}>
                        <div className="col">
                            <h3>All Courses</h3>
                            <ul>
                                {searchResults.map(course => (
                                    <li key={course._id}>
                                        <div>
                                            <h4>{course.title}</h4>
                                            <p>{course.description}</p>
                                            <button className="btn btn-primary"
                                                    onClick={() => handleViewCourse(course)}>View
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal to display course details */}
            <Modal show={selectedCourse !== null} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Course Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedCourse && (
                        <div>
                            <h2>{selectedCourse.title}</h2>
                            <p>Description: {selectedCourse.description}</p>
                            <p>Syllabus: {selectedCourse.syllabus}</p>
                            <p>Enrollment Criteria: {selectedCourse.enrollmentCriteria}</p>
                            <Button variant="success" onClick={() => handleEnroll(selectedCourse._id)}>Enroll</Button>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
