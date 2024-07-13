import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import { CgProfile } from 'react-icons/cg';
import { Modal, Button } from 'antd';
import AdminAddConsult from "./AdminAddConsult"; // Import Modal and Button components from antd

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [adminName, setAdminName] = useState('');
    const [dashboardCounts, setDashboardCounts] = useState({
        usersCount: 0,
        companiesCount: 0,
        institutesCount: 0,
        jobsCount: 0,
        coursesCount: 0
    });
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                type: 'donut',
                width: '100',
            },
            labels: ['Users', 'Companies', 'Institutes', 'Jobs', 'Courses'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 300
                    },
                    legend: {
                        position: 'bottom'
                    },
                }
            }],
            legend: {
                position: 'right',
                offsetY: 50,
                height: 230,
            },

        },
    });

    // State to control the visibility of the modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        const storedAdminName = localStorage.getItem('adminName');
        if (storedAdminName) {
            setAdminName(storedAdminName);
        }

        async function fetchDashboardCounts() {
            try {
                const token = localStorage.getItem('auth-token');
                const response = await axios.get('http://localhost:8070/api/admins/dashboard-counts', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setDashboardCounts(response.data);

                const total = Object.values(response.data).reduce((a, b) => a + b, 0);

                const percentages = Object.values(response.data).map(count => (count / total) * 100);
                setChartData(prevState => ({ ...prevState, series: percentages }));

            } catch (error) {
                console.error('Error fetching dashboard counts:', error);
            }
        }

        fetchDashboardCounts();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8070/api/users/all');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
            <div style={{ backgroundColor: '#32256d', padding: '20px', borderRadius: '10px', color: '#fff' }}>
                <h1>Welcome <span style={{ color: '#ccc' }}>{adminName}</span></h1>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <div style={{ flex: '1', margin: '10px' }}>
                        <button style={{ backgroundColor: '#28a745', borderRadius: '10px', padding: '15px', width: '100%', color: '#fff', fontSize: '16px', fontWeight: 'bold'  }}>Jobs: {dashboardCounts.jobsCount}</button>
                    </div>
                    <div style={{ flex: '1', margin: '10px' }}>
                        <button style={{ backgroundColor: '#28a745', borderRadius: '10px', padding: '15px', width: '100%', color: '#fff', fontSize: '16px', fontWeight: 'bold'  }}>Users: {dashboardCounts.usersCount}</button>
                    </div>
                    <div style={{ flex: '1', margin: '10px' }}>
                        <button style={{ backgroundColor: '#28a745', borderRadius: '10px', padding: '15px', width: '100%' , color: '#fff', fontSize: '16px', fontWeight: 'bold' }}>Companies: {dashboardCounts.companiesCount}</button>
                    </div>
                    <div style={{ flex: '1', margin: '10px' }}>
                        <button style={{ backgroundColor: '#28a745', borderRadius: '10px', padding: '15px', width: '100%' , color: '#fff', fontSize: '16px', fontWeight: 'bold' }}>Institutes: {dashboardCounts.institutesCount}</button>
                    </div>
                    <div style={{ flex: '1', margin: '10px' }}>
                        <button style={{ backgroundColor: '#28a745', borderRadius: '10px', padding: '15px', width: '100%', color: '#fff', fontSize: '16px', fontWeight: 'bold' }}>Courses: {dashboardCounts.coursesCount}</button>
                    </div>

                </div>
            </div>

            <div style={{ marginTop: '50px' }}>
                <div style={{ display: 'flex' }}>
                    <div style={{ flex: '1', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '10px', padding: '20px' }}>
                    <span style={{ fontSize: '30px', color: '#28a745' }}>Total <span style={{ color: '#dc3545' }}>Percentage</span></span>
                        <div style={{ width: '70%', margin: '20px auto' }}>
                            <ReactApexChart options={chartData.options} series={chartData.series} type="donut" />
                        </div>
                    </div>


                    <div style={{ flex: '1', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '10px', padding: '20px', maxHeight: '500px', overflowY: 'auto', marginLeft: '20px' }}>
                        <span style={{ fontSize: '30px', color: '#28a745' }}>Recent <span style={{ color: '#dc3545' }}>Users</span></span>
                        {users.slice(0, 5).map((user, index) => (
                            <div key={user._id} style={{ margin: '20px 0' }}>
                                <div style={{ borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <CgProfile style={{ fontSize: '20px', marginRight: '10px' }} /><span>{user.profile.firstName} {user.profile.lastName}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
                <div style={{ backgroundColor: '#28a745', color: '#fff', padding: '15px', width: '50%', textAlign: 'center', cursor: 'pointer', borderRadius: '10px' }} onClick={showModal}>Add Consultant</div>

                <Modal title="Add Consultant" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width="80%">
                    <AdminAddConsult/>
                </Modal>
            </div>

        </div>
    );
};

export default AdminDashboard;
