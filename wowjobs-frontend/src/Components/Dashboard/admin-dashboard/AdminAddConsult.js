import React, { useState } from 'react';
import axios from 'axios';
import ConsultLoginImg from '../../../assets/AddConsult.jpg';

const AdminAddConsult = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [bio, setBio] = useState('');
    const [expertise, setExpertise] = useState('');
    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');
    const [duration, setDuration] = useState('');
    const [error, setError] = useState('');

    const validateInputs = () => {
        let isValid = true;

        // Validate firstName, lastName, company, position (no numbers allowed)
        const nameRegex = /^[^\d]+$/;
        if (!nameRegex.test(firstName) || !nameRegex.test(lastName) || !nameRegex.test(company) || !nameRegex.test(position)) {
            setError('First Name, Last Name, Company, and Position should not contain numbers');
            isValid = false;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Invalid email format');
            isValid = false;
        }

        // Validate password match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if inputs are valid
        if (!validateInputs()) {
            return;
        }

        try {
            // Proceed with registration if inputs are valid
            const response = await axios.post('http://localhost:8070/api/admins/consultants/register', {
                firstName,
                lastName,
                email,
                password,
                profile: {
                    bio,
                    expertise: expertise.split(','),
                    experience: [{
                        company,
                        position,
                        duration
                    }]
                }
            });

            console.log('Consultant registration successful:', response.data);
            window.alert('Consultant created successfully!');

            clearFields();
        } catch (error) {
            console.error('Error registering consultant:', error);
        }
    };

    const clearFields = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setBio('');
        setExpertise('');
        setCompany('');
        setPosition('');
        setDuration('');
        setError('');
    };

    return (
        <div className="row">
            <div className="col">
                <div className="container mt-4 mb-2 mx-3">
                    <h2 className="fw-bolder mb-4">ADD CONSULT</h2>
                    <form onSubmit={handleSubmit} className="form">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>First Name:</label>
                                <input type="text" className="form-control" value={firstName}
                                       onChange={(e) => setFirstName(e.target.value)} required/>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Last Name:</label>
                                <input type="text" className="form-control" value={lastName}
                                       onChange={(e) => setLastName(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label>Email:</label>
                            <input type="email" className="form-control" value={email}
                                   onChange={(e) => setEmail(e.target.value)} required/>
                        </div>
                        <div className="mb-3">
                            <label>Bio:</label>
                            <textarea className="form-control" value={bio}
                                      onChange={(e) => setBio(e.target.value)}
                                      required></textarea>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Expertise:</label>
                                <input type="text" className="form-control" value={expertise}
                                       onChange={(e) => setExpertise(e.target.value)} required/>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Company:</label>
                                <input type="text" className="form-control" value={company}
                                       onChange={(e) => setCompany(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Position:</label>
                                <input type="text" className="form-control" value={position}
                                       onChange={(e) => setPosition(e.target.value)} required/>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Duration:</label>
                                <input type="text" className="form-control" value={duration}
                                       onChange={(e) => setDuration(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Password:</label>
                                <input type="password" className="form-control" value={password}
                                       onChange={(e) => setPassword(e.target.value)} required/>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Confirm Password:</label>
                                <input type="password" className="form-control" value={confirmPassword}
                                       onChange={(e) => setConfirmPassword(e.target.value)} required/>
                            </div>
                        </div>
                        {error && <div className="text-danger mb-3">{error}</div>}
                        <center>
                            <button type="submit" className="btn btn-dark text-light rounded-5">Register Consultant</button>
                        </center>
                    </form>
                </div>
            </div>
            <div className="col d-flex align-items-center">
                <img src={ConsultLoginImg} alt="Consult Login" className="img-fluid" />
            </div>
        </div>
    );
};

export default AdminAddConsult;
