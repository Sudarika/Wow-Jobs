import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {RiAddLine, RiCloseLine} from 'react-icons/ri';

const UserSignup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        title: '',
        company: '',
        location: '',
        bio: '',
        education: [{institution: '', degree: '', fieldOfStudy: '', startYear: '', endYear: ''}],
        skills: ['']
    });
    const [contact, setContact] = useState({
        phone: '',
        address: '',
        linkedIn: '',
        twitter: ''
    });
    const [userType, setUserType] = useState('user');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleAddSkill = () => {
        setProfile(prevProfile => ({
            ...prevProfile,
            skills: [...prevProfile.skills, '']
        }));
    };

    const handleRemoveSkill = (index) => {
        setProfile(prevProfile => ({
            ...prevProfile,
            skills: prevProfile.skills.filter((_, i) => i !== index)
        }));
    };

    const handleSkillChange = (index, value) => {
        setProfile(prevProfile => {
            const updatedSkills = [...prevProfile.skills];
            updatedSkills[index] = value;
            return {
                ...prevProfile,
                skills: updatedSkills
            };
        });
    };

    const handleAddEducation = () => {
        setProfile(prevProfile => ({
            ...prevProfile,
            education: [...prevProfile.education, {
                institution: '',
                degree: '',
                fieldOfStudy: '',
                startYear: '',
                endYear: ''
            }]
        }));
    };

    const handleRemoveEducation = (index) => {
        setProfile(prevProfile => ({
            ...prevProfile,
            education: prevProfile.education.filter((_, i) => i !== index)
        }));
    };

    const handleEducationChange = (index, field, value) => {
        setProfile(prevProfile => {
            const updatedEducation = [...prevProfile.education];
            updatedEducation[index] = {
                ...updatedEducation[index],
                [field]: value
            };
            return {
                ...prevProfile,
                education: updatedEducation
            };
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8070/api/users/register', {
                username,
                password,
                email,
                profile,
                contact,
                userType
            });

            console.log(response.data);

            navigate('/login');
        } catch (err) {
            setError(err.response.data);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow p-3 rounded">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="username" className="form-label">Username:</label>
                                        <input type="text" className="form-control" id="username" value={username}
                                               onChange={(e) => setUsername(e.target.value)} required/>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="password" className="form-label">Password:</label>
                                        <input type="password" className="form-control" id="password" value={password}
                                               onChange={(e) => setPassword(e.target.value)} required/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="email" className="form-label">Email:</label>
                                        <input type="email" className="form-control" id="email" value={email}
                                               onChange={(e) => setEmail(e.target.value)} required/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="firstName" className="form-label">First Name:</label>
                                        <input type="text" className="form-control" id="firstName"
                                               value={profile.firstName}
                                               onChange={(e) => setProfile({...profile, firstName: e.target.value})}/>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="lastName" className="form-label">Last Name:</label>
                                        <input type="text" className="form-control" id="lastName"
                                               value={profile.lastName}
                                               onChange={(e) => setProfile({...profile, lastName: e.target.value})}/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="title" className="form-label">Title:</label>
                                        <input type="text" className="form-control" id="title" value={profile.title}
                                               onChange={(e) => setProfile({...profile, title: e.target.value})}/>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="company" className="form-label">Company:</label>
                                        <input type="text" className="form-control" id="company" value={profile.company}
                                               onChange={(e) => setProfile({...profile, company: e.target.value})}/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="location" className="form-label">Location:</label>
                                        <input type="text" className="form-control" id="location"
                                               value={profile.location}
                                               onChange={(e) => setProfile({...profile, location: e.target.value})}/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="bio" className="form-label">Bio:</label>
                                        <textarea className="form-control" id="bio" value={profile.bio}
                                                  onChange={(e) => setProfile({
                                                      ...profile,
                                                      bio: e.target.value
                                                  })}></textarea>
                                    </div>
                                </div>
                                {/* Education fields */}
                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="education" className="form-label">Education:</label>
                                        {profile.education.map((edu, index) => (
                                            <div key={index}>
                                                <input type="text" className="form-control mb-2"
                                                       placeholder="Institution"
                                                       value={edu.institution}
                                                       onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}/>
                                                <input type="text" className="form-control mb-2" placeholder="Degree"
                                                       value={edu.degree}
                                                       onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}/>
                                                <input type="text" className="form-control mb-2"
                                                       placeholder="Field of Study"
                                                       value={edu.fieldOfStudy}
                                                       onChange={(e) => handleEducationChange(index, 'fieldOfStudy', e.target.value)}/>
                                                <div className="row">
                                                    <div className="col">
                                                        <input type="number" className="form-control mb-2"
                                                               placeholder="Start Year"
                                                               value={edu.startYear}
                                                               onChange={(e) => handleEducationChange(index, 'startYear', e.target.value)}/>
                                                    </div>
                                                    <div className="col">
                                                        <input type="number" className="form-control mb-2"
                                                               placeholder="End Year"
                                                               value={edu.endYear}
                                                               onChange={(e) => handleEducationChange(index, 'endYear', e.target.value)}/>
                                                    </div>
                                                </div>
                                                {index === profile.education.length - 1 && (
                                                    <button className="btn btn-outline-success me-2" type="button"
                                                            onClick={handleAddEducation}>
                                                        <RiAddLine/>
                                                    </button>
                                                )}
                                                {index !== profile.education.length - 1 && (
                                                    <button className="btn btn-outline-danger me-2" type="button"
                                                            onClick={() => handleRemoveEducation(index)}>
                                                        <RiCloseLine/>
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Skills fields */}
                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="skills" className="form-label">Skills:</label>
                                        {profile.skills.map((skill, index) => (
                                            <div key={index}>
                                                <input type="text" className="form-control mb-2" placeholder="Skill"
                                                       value={skill}
                                                       onChange={(e) => handleSkillChange(index, e.target.value)}/>
                                                {index === profile.skills.length - 1 && (
                                                    <button className="btn btn-outline-success me-2" type="button"
                                                            onClick={handleAddSkill}>
                                                        <RiAddLine/>
                                                    </button>
                                                )}
                                                {index !== profile.skills.length - 1 && (
                                                    <button className="btn btn-outline-danger me-2" type="button"
                                                            onClick={() => handleRemoveSkill(index)}>
                                                        <RiCloseLine/>
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Contact fields */}
                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="phone" className="form-label">Phone:</label>
                                        <input type="text" className="form-control" id="phone" value={contact.phone}
                                               onChange={(e) => setContact({...contact, phone: e.target.value})}/>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="address" className="form-label">Address:</label>
                                        <input type="text" className="form-control" id="address" value={contact.address}
                                               onChange={(e) => setContact({...contact, address: e.target.value})}/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="linkedIn" className="form-label">LinkedIn:</label>
                                        <input type="text" className="form-control" id="linkedIn"
                                               value={contact.linkedIn}
                                               onChange={(e) => setContact({...contact, linkedIn: e.target.value})}/>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="twitter" className="form-label">Twitter:</label>
                                        <input type="text" className="form-control" id="twitter" value={contact.twitter}
                                               onChange={(e) => setContact({...contact, twitter: e.target.value})}/>
                                    </div>
                                </div>
                                {/* User type */}
                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="userType" className="form-label">User Type:</label>
                                        <select className="form-select" id="userType" value={userType}
                                                onChange={(e) => setUserType(e.target.value)}>
                                            <option value="user">User</option>
                                            <option value="company">Company</option>
                                            <option value="institute">Institute</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>
                                </div>
                                {/* Submit button */}
                                <div className="row mb-3">
                                    <div className="col">
                                        <button type="submit" className="btn btn-success">Sign Up</button>
                                    </div>
                                </div>
                            </form>
                            {error && <p>{error}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserSignup;