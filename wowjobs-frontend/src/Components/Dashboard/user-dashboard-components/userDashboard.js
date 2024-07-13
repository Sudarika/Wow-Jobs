import React, {useEffect, useState} from 'react';
import axios from 'axios';
import userDashboard from "../../../assets/userDashboard.png";

export default function UserDashboard() {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('auth-token');

                if (token) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                    const response = await axios.get('http://localhost:8070/api/users/profile');
                    const userProfile = response.data;

                    const {username} = userProfile;
                    setUserName(username);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <>
            <div style={{position: "relative"}}>
                <img src={userDashboard} alt="image" className="mw-100 h-auto"/>
                <div className="text-light"
                     style={{position: "absolute", top: 0, left: 0, marginLeft: '20px', marginTop: '50px'}}>
                    <h2>Welcome to your dashboard, <span style={{color: 'aquamarine'}}>{userName}</span></h2>
                    <p>Here you can view your profile, edit your profile, view your applications, and view your saved
                        jobs.</p>
                </div>
            </div>

            <div>
                <div className="fs-1 text-success fw-bold mx-3 mt-3">
                    About Us
                </div>
                <div className="mx-3">
                    Weekend UX, is a UI/UX Design Academy in Delhi involved in User Experience and User Interface
                    Training and Consulting. It was started in 2023 and passionate towards User Interface Design/ User
                    Experience Design, Human Computer Interaction Design. Humanoid is gushing towards competence to
                    acquire knowledge and have a wide understanding towards the sphere through the foremost courses in
                    the area of UI/UX Design, by strengthening up your skills, for your golden future
                </div>
            </div>

            <div>
                <center>
                    <div style={{fontSize: '60px', fontWeight: 'bold'}}>
                        Your Dream <span className="text-success">Job Is Waiting</span>
                    </div>
                </center>

                <div className="row">
                    <div className="col border rounded-5 p-3 m-2" style={{backgroundColor:'#e0ffe0'}}>
                        <h4>Need a Internship / Undergraduate</h4>
                        <p>Grow up your skills by online courses with e learning</p>
                    </div>
                    <div className="col border rounded-5 p-3 m-2" style={{backgroundColor:'#e0ffe0'}}>
                        <h4>Need a job</h4>
                        <p>Grow up your skills by online courses with e learning</p>
                    </div>
                </div>

                <div className="row ">
                    <div className="col border rounded-5 p-3 m-2" style={{backgroundColor:'#e0ffe0'}}>
                        <h4>Need a Consult</h4>
                        <p>You can gain valuable insights into your desired field by consulting with job consultants.
                            The experts can give you advice on the latest industry trends, the skills employers are
                            looking for, and even the average salary.</p>
                    </div>
                    <div className="col border rounded-5 p-3 m-2" style={{backgroundColor:'#e0ffe0'}}>
                        <h4>Need a Course</h4>
                        <p>Grow up your skills by online courses with e learning</p>
                    </div>
                </div>

                <div className="row ">
                    <center>
                        <div className="col-12 border rounded-5 p-3 m-2" style={{backgroundColor:'#e0ffe0'}}>
                            <h4>KUPPIYA</h4>
                            <p>You can discuss questions about your skills and get the help you need through this section</p>
                        </div>
                    </center>
                </div>

            </div>

        </>
    );
}
