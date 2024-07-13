import React, { useState } from 'react';
import SignupImg from '../../assets/SignupImg.png';
import UserSignup from "../../Components/Signup/UserSignup";
import CompanySignup from "../../Components/Signup/CompanySignup";
import InstituteSignup from "../../Components/Signup/InstituteSignup";
import AdminSignup from "../../Components/Signup/AdminSignup";

export default function SignupPage() {
    const [activeComponent, setActiveComponent] = useState("user");

    return (
        <div>
            <div className="row">
                <div className="col-8">
                    <center>
                        <h1 className="test-align-center align-self-center mb-3 mt-5 text-uppercase">Select Type</h1>

                        <button onClick={() => setActiveComponent("user")} className="btn btn-outline-success rounded-5 mx-3">As User</button>
                        <button onClick={() => setActiveComponent("company")} className="btn btn-outline-success rounded-5 mx-3">As Company</button>
                        <button onClick={() => setActiveComponent("institute")} className="btn btn-outline-success rounded-5 mx-3">As Institute</button>
                        <button onClick={() => setActiveComponent("consult")} className="btn btn-outline-success rounded-5 mx-3">As Admin</button>
                    </center>

                    {activeComponent === "user" && <UserSignup/>}
                    {activeComponent === "company" && <CompanySignup/>}
                    {activeComponent === "consult" && <AdminSignup/>}
                    {activeComponent === "institute" && <InstituteSignup/>}

                </div>
                <div className="col-4">
                    <img src={SignupImg} alt="Signup" className="img-fluid mt-5" style={{width: '500px'}}/>
                </div>
            </div>
        </div>
    );
}
