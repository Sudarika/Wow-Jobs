import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddCourse = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [syllabus, setSyllabus] = useState('');
    const [enrollmentCriteria, setEnrollmentCriteria] = useState('');
    const [content, setContent] = useState([]);
    const [newTopic, setNewTopic] = useState('');
    const [newUrl, setNewUrl] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleAddContent = () => {
        setContent([...content, { topic: newTopic, url: newUrl }]);
        setNewTopic('');
        setNewUrl('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validation
        if (!title || !description || !syllabus || !enrollmentCriteria ) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8070/api/institutes/course', {
                title,
                description,
                syllabus,
                enrollmentCriteria,
                content
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth-token')}`
                }
            });

            navigate('/institute-dashboard');
            window.alert("Course added successfully");
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return (
        <>
            <center>
                <div className="container m-4 border shadow p-3 rounded-5 mt-5">
                    <center><h2 className="my-3">Add Course</h2></center>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Title:</label>
                            <input type="text" className="form-control" value={title}
                                   onChange={(e) => setTitle(e.target.value)} required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description:</label>
                            <textarea className="form-control" value={description}
                                      onChange={(e) => setDescription(e.target.value)} required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Syllabus:</label>
                            <textarea className="form-control" value={syllabus}
                                      onChange={(e) => setSyllabus(e.target.value)} required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Enrollment Criteria:</label>
                            <textarea className="form-control" value={enrollmentCriteria}
                                      onChange={(e) => setEnrollmentCriteria(e.target.value)} required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Content:</label>
                            <div className="row">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Topic"
                                           value={newTopic} onChange={(e) => setNewTopic(e.target.value)} required/>
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="URL"
                                           value={newUrl} onChange={(e) => setNewUrl(e.target.value)} required/>
                                </div>
                                <div className="col-auto">
                                    <button type="button" className="btn btn-primary" onClick={handleAddContent}>Add</button>
                                </div>
                            </div>
                            <div>
                                {content.map((item, index) => (
                                    <div key={index}>
                                        <p>{item.topic} - {item.url}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>
                    {error && <p className="mt-3 text-danger">{error}</p>}
                </div>
            </center>
        </>
    );
};

export default AddCourse;
