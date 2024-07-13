// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Modal, Button } from 'react-bootstrap';
// import YouTube from 'react-youtube';
//
// const UserCourseList = () => {
//     const [enrolledCourses, setEnrolledCourses] = useState([]);
//     const [showModal, setShowModal] = useState(false);
//     const [selectedCourse, setSelectedCourse] = useState(null);
//
//     const handleCloseModal = () => setShowModal(false);
//
//     const handleOpenModal = (course) => {
//         setSelectedCourse(course);
//         setShowModal(true);
//     };
//
//     useEffect(() => {
//         const fetchEnrolledCourses = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8070/api/users/courses/enrolled', {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('auth-token')}`
//                     }
//                 });
//                 setEnrolledCourses(response.data);
//             } catch (error) {
//                 console.error('Error fetching enrolled courses:', error);
//             }
//         };
//
//         fetchEnrolledCourses();
//     }, []);
//
//     const handleCheckboxChange = async (contentId, isChecked) => {
//         try {
//             const updatedContent = { completed: isChecked };
//             await axios.put(`http://localhost:8070/api/courses/${selectedCourse._id}/content/${contentId}`, updatedContent, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('auth-token')}`
//                 }
//             });
//             const updatedCourses = enrolledCourses.map(course => {
//                 if (course._id === selectedCourse._id) {
//                     return {
//                         ...course,
//                         content: course.content.map(item => {
//                             if (item._id === contentId) {
//                                 return {
//                                     ...item,
//                                     completed: isChecked
//                                 };
//                             }
//                             return item;
//                         })
//                     };
//                 }
//                 return course;
//             });
//             setEnrolledCourses(updatedCourses);
//         } catch (error) {
//             console.error('Error updating content completion status:', error);
//         }
//     };
//
//     const handleUnenroll = async () => {
//         try {
//             await axios.delete(`http://localhost:8070/api/users/courses/unenroll/${selectedCourse._id}`, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('auth-token')}`
//                 }
//             });
//             const updatedCourses = enrolledCourses.filter(course => course._id !== selectedCourse._id);
//             setEnrolledCourses(updatedCourses);
//             setShowModal(false);
//         } catch (error) {
//             console.error('Error unenrolling from course:', error);
//         }
//     };
//
//     return (
//         <div className="container mt-5">
//             <h2>Enrolled Courses</h2>
//             <ul>
//                 {enrolledCourses.map(course => (
//                     <li key={course._id}>
//                         <div>
//                             <h4>{course.title}</h4>
//                             <p>{course.description}</p>
//                             <Button onClick={() => handleOpenModal(course)}>Open</Button>
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//
//             {/* Modal to display course details */}
//             <Modal show={showModal} onHide={handleCloseModal} size="xl">
//                 <Modal.Header closeButton>
//                     <Modal.Title>Course Details</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {selectedCourse && (
//                         <div>
//                             <h2>{selectedCourse.title}</h2>
//                             <p>Description: {selectedCourse.description}</p>
//                             <p>Syllabus: {selectedCourse.syllabus}</p>
//                             <h3>Content:</h3>
//                             <ul>
//                                 {selectedCourse.content.map(item => (
//                                     <li key={item._id}>
//                                         <input
//                                             type="checkbox"
//                                             checked={item.completed}
//                                             onChange={(e) => handleCheckboxChange(item._id, e.target.checked)}
//                                         />
//                                         <label>{item.topic}</label>
//                                         {item.url.includes('youtu.be') ? (
//                                             <YouTube videoId={item.url.split('/').pop()} />
//                                         ) : (
//                                             <a href={item.url} target="_blank" rel="noopener noreferrer">View Content</a>
//                                         )}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     )}
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="danger" onClick={handleUnenroll}>Unenroll</Button>
//                     <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// };
//
// export default UserCourseList;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import YouTube from 'react-youtube';
import {IoMdRefresh} from "react-icons/io";

const UserCourseList = () => {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const handleCloseModal = () => setShowModal(false);

    const handleOpenModal = (course) => {
        setSelectedCourse(course);
        setShowModal(true);
    };

    const fetchEnrolledCourses = async () => {
        try {
            const response = await axios.get('http://localhost:8070/api/users/courses/enrolled', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth-token')}`
                }
            });
            setEnrolledCourses(response.data);
        } catch (error) {
            console.error('Error fetching enrolled courses:', error);
        }
    };

    useEffect(() => {
        fetchEnrolledCourses();
    }, []);

    const handleCheckboxChange = async (contentId, isChecked) => {
        try {
            const updatedContent = { completed: isChecked };
            await axios.put(`http://localhost:8070/api/courses/${selectedCourse._id}/content/${contentId}`, updatedContent, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth-token')}`
                }
            });
            const updatedCourses = enrolledCourses.map(course => {
                if (course._id === selectedCourse._id) {
                    return {
                        ...course,
                        content: course.content.map(item => {
                            if (item._id === contentId) {
                                return {
                                    ...item,
                                    completed: isChecked
                                };
                            }
                            return item;
                        })
                    };
                }
                return course;
            });
            setEnrolledCourses(updatedCourses);
        } catch (error) {
            console.error('Error updating content completion status:', error);
        }
    };

    const handleUnenroll = async () => {
        try {
            await axios.delete(`http://localhost:8070/api/users/courses/unenroll/${selectedCourse._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth-token')}`
                }
            });
            const updatedCourses = enrolledCourses.filter(course => course._id !== selectedCourse._id);
            setEnrolledCourses(updatedCourses);
            setShowModal(false);
        } catch (error) {
            console.error('Error unenrolling from course:', error);
        }
    };

    const refreshCourseList = () => {
        fetchEnrolledCourses();
    };

    return (
        <div className="container mt-5">
            <h2>Enrolled Courses <Button className="btn-light border" onClick={refreshCourseList}><IoMdRefresh style={{fontSize: '20px'}}/></Button></h2>
            <ul>
                {enrolledCourses.map(course => (
                    <li key={course._id}>
                        <div>
                            <h4>{course.title}</h4>
                            <p>{course.description}</p>
                            <Button onClick={() => handleOpenModal(course)}>Open</Button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Modal to display course details */}
            <Modal show={showModal} onHide={handleCloseModal} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Course Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedCourse && (
                        <div>
                            <h2>{selectedCourse.title}</h2>
                            <p>Description: {selectedCourse.description}</p>
                            <p>Syllabus: {selectedCourse.syllabus}</p>
                            <h3>Content:</h3>
                            <ul>
                                {selectedCourse.content.map(item => (
                                    <li key={item._id}>
                                        <input
                                            type="checkbox"
                                            checked={item.completed}
                                            onChange={(e) => handleCheckboxChange(item._id, e.target.checked)}
                                        />
                                        <label>{item.topic}</label>
                                        {item.url.includes('youtu.be') ? (
                                            <YouTube videoId={item.url.split('/').pop()} />
                                        ) : (
                                            <a href={item.url} target="_blank" rel="noopener noreferrer">View Content</a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleUnenroll}>Unenroll</Button>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UserCourseList;
