import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { FaChalkboardTeacher, FaHandsHelping } from "react-icons/fa";
import ConsultNotifications from "../../../Components/Dashboard/Consult-dashboard/ConsultNotifications";
import ConsultAppointment from "../../../Components/Dashboard/Consult-dashboard/ConsultAppointment";
import ConsultantDashboard from "../../../Components/Dashboard/Consult-dashboard/ConsultantDashboard";
import ConsultProfile from "../../../Components/Dashboard/Consult-dashboard/ConsultProfile";

export default function ConsultDashboard() {
    const [activeComponent, setActiveComponent] = useState("dashboard"); // Default loading page is "dashboard"

    useEffect(() => {
        const authToken = localStorage.getItem('auth-token');
        if (!authToken) {
            window.location.href = '/';
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        window.location.href = '/';
    };

    return (
        <Container fluid>
            <Row>
                <Col md={2}>
                    <Nav defaultActiveKey="/home" className="flex-column bg-light text-white sidebar" style={{ minWidth: '250px', height: '100vh' }}>
                        <div className="align-self-center">
                            <h3 className="mb-4 mt-3 text-danger">Consultant</h3>
                        </div>
                        <Nav.Link onClick={() => setActiveComponent("dashboard")} className="Asidebar-text"><FaChalkboardTeacher/> Dashboard</Nav.Link>
                        <Nav.Link onClick={() => setActiveComponent("appointments")} className="Asidebar-text"><FaChalkboardTeacher/> Appointments</Nav.Link>
                        <Nav.Link onClick={() => window.location.href = 'http://localhost:3001/'} className="Asidebar-text"><FaHandsHelping/> Chat</Nav.Link>
                        <Nav.Link onClick={() => setActiveComponent("notifications")} className="Asidebar-text"><FaHandsHelping/> Notifications</Nav.Link>
                        <Nav.Link onClick={() => setActiveComponent("profile")} className="Asidebar-text"><FaHandsHelping/> Profile</Nav.Link>
                        <hr />
                        <Nav.Link onClick={handleLogout} className="sidebar-text text-danger mt-5">Logout</Nav.Link>
                    </Nav>
                </Col>
                <Col md={10}>
                    {activeComponent === "dashboard" && <ConsultantDashboard/>}
                    {activeComponent === "appointments" && <ConsultAppointment/>}
                    {activeComponent === "notifications" && <ConsultNotifications/>}
                    {activeComponent === "profile" && <ConsultProfile/>}
                </Col>
            </Row>
        </Container>
    );
}
