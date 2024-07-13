import React, { useState } from "react";
import AllKuppiQuestions from "./AllKuppiQuestions";
import AllKuppies from "./AllKippies";
import { Nav, NavItem } from 'react-bootstrap';

export default function UserKuppi() {
    const [activeTab, setActiveTab] = useState('kuppiQuestions');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const navItemStyle = {
        borderBottom: "2px solid transparent",
        padding: "10px 15px",
        cursor: "pointer",
        transition: "border-color 0.3s ease",
    };

    const activeNavItemStyle = {
        borderBottom: "2px solid #3f51b5",
        fontWeight: "bold",
    };

    return (
        <div>
            <Nav fill variant="tabs">
                <NavItem style={activeTab === 'kuppiQuestions' ? {...navItemStyle, ...activeNavItemStyle} : navItemStyle}>
                    <Nav.Link eventKey="kuppiQuestions" onClick={() => handleTabChange('kuppiQuestions')}>
                        Kuppi Questions
                    </Nav.Link>
                </NavItem>
                <NavItem style={activeTab === 'allKuppies' ? {...navItemStyle, ...activeNavItemStyle} : navItemStyle}>
                    <Nav.Link eventKey="allKuppies" onClick={() => handleTabChange('allKuppies')}>
                        Kuppies
                    </Nav.Link>
                </NavItem>
            </Nav>

            {activeTab === 'kuppiQuestions' && <AllKuppiQuestions />}
            {activeTab === 'allKuppies' && <AllKuppies />}
        </div>
    );
}
