import React, {useState} from 'react';
import UserLogin from "../../Components/Login/UserLogin";
import CompanyLogin from "../../Components/Login/CompanyLogin";
import AdminLogin from "../../Components/Login/AdminLogin";
import InstituteLogin from "../../Components/Login/InstituteLogin";
import ConsultLogin from "../../Components/Login/ConsultLogin";

export default function LoginPage() {
    const [activeComponent, setActiveComponent] = useState("user");

    return (
        <div>
            <center>
                <h1 className="test-align-center align-self-center mb-3 mt-5 text-uppercase border w-50 border-5 mb-5">Select Type</h1>

                <button onClick={() => setActiveComponent("user")} className="btn btn-outline-success rounded-5 mx-3">As
                    User
                </button>
                <button onClick={() => setActiveComponent("company")}
                        className="btn btn-outline-success rounded-5 mx-3">As Company
                </button>
                <button onClick={() => setActiveComponent("admin")}
                        className="btn btn-outline-success rounded-5 mx-3">As Admin
                </button>
                <button onClick={() => setActiveComponent("institute")}
                        className="btn btn-outline-success rounded-5 mx-3">As Institute
                </button>
                <button onClick={() => setActiveComponent("consultant")}
                        className="btn btn-outline-success rounded-5 mx-3">As Consultant
                </button>
            </center>

            {activeComponent === "user" && <UserLogin/>}
            {activeComponent === "company" && <CompanyLogin/>}
            {activeComponent === "admin" && <AdminLogin/>}
            {activeComponent === "institute" && <InstituteLogin/>}
            {activeComponent === "consultant" && <ConsultLogin/>}

        </div>
    );
}
