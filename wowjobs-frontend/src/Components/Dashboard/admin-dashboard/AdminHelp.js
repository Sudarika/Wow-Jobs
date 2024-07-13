import { Typography, Row, Col } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminHelp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog, faFileAlt, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';

const { Title, Paragraph } = Typography;

export default function AdminHelp() {
    return (
        <div className="admin-help-container">
            <Title level={2} className="title">Admin Help</Title>
            <Row gutter={[24, 24]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <div className="admin-help-section m-2">
                        <div className="icon-container">
                            <FontAwesomeIcon icon={faUser} className="icon" />
                        </div>
                        <Title level={4}>User Management</Title>
                        <Paragraph>
                            Admins have the ability to manage all users, including viewing, editing, and deleting them.
                        </Paragraph>
                    </div>
                    <div className="admin-help-section m-2">
                        <div className="icon-container">
                            <FontAwesomeIcon icon={faCog} className="icon" />
                        </div>
                        <Title level={4}>Content Management</Title>
                        <Paragraph>
                            Admins can manage jobs, events, and courses, including viewing, editing, and deleting them.
                        </Paragraph>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <div className="admin-help-section m-2">
                        <div className="icon-container">
                            <FontAwesomeIcon icon={faFileAlt} className="icon" />
                        </div>
                        <Title level={4}>Company & Institute Management</Title>
                        <Paragraph>
                            Admins can manage all companies and institutes, including viewing, editing, and deleting them.
                        </Paragraph>
                    </div>
                    <div className="admin-help-section m-2">
                        <div className="icon-container">
                            <FontAwesomeIcon icon={faHandHoldingUsd} className="icon" />
                        </div>
                        <Title level={4}>Application & Enrollment Management</Title>
                        <Paragraph>
                            Admins can manage job applications, event registrations, and course enrollments.
                        </Paragraph>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
