import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddCourse from "./AddCourse";

const InstituteDashboard = () => {
    const [featuredCourses, setFeaturedCourses] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFeaturedCourses = async () => {
            try {
                const token = localStorage.getItem('auth-token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const response = await axios.get('http://localhost:8070/api/institutes/featured-courses', config);
                setFeaturedCourses(response.data);
            } catch (err) {
                setError('Failed to fetch featured courses.');
                console.error('Fetch Featured Courses Error:', err);
            }
        };

        fetchFeaturedCourses();
    }, []);

    return (
        <div>
            <h1 className="mt-3 mx-3">Institute <span className="text-success">Dashboard</span></h1>

            <div className="row">
                <div className="col">
                    <h3 className="mt-3 mx-3">Featured <span className="text-danger">Courses</span></h3>
                    {featuredCourses.length > 0 ? (
                        <ul>
                            {featuredCourses.map(course => (
                                <li key={course._id}>
                                    <h4>{course.title}</h4>
                                    <p>{course.description}</p>
                                    {/* Add more details as needed */}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No featured courses available</p>
                    )}
                    {error && <p className="text-danger">{error}</p>}
                </div>
                <div className="col">
                    <h4 className="mt-3 mx-3">Add <span className="text-danger">Courses</span></h4>
                    <AddCourse/>
                </div>
            </div>
        </div>
    );
};

export default InstituteDashboard;
