import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CgProfile } from "react-icons/cg";

const AddUserFriends = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8070/api/users/all');
                setUsers(response.data);
                setFilteredUsers(response.data);
            } catch (error) {
                setError('Error fetching users.');
            }
        };

        const fetchLoggedInUser = async () => {
            try {
                const response = await axios.get('http://localhost:8070/api/users/profile'); // Assuming this endpoint returns logged-in user's information
                setLoggedInUser(response.data);
            } catch (error) {
                setError('Error fetching user information.');
            }
        };

        fetchUsers();
        fetchLoggedInUser();
    }, []);

    const handleFriendRequest = async (userId) => {
        try {
            await axios.post(`http://localhost:8070/api/users/send-friend-request/${userId}`);
            alert('Friend request sent successfully!');
        } catch (error) {
            setError('Error sending friend request.');
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        const filtered = users.filter(user =>
            user.username.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    return (
        <div className="container mt-5" style={{ marginRight: '50px' }}>
            <div className="row">
                <div className="col">
                    <h2 className="mb-4">Add Friends</h2>
                </div>
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row">
                <div className="col">
                    <ul className="list-group">
                        {filteredUsers.map((user) => (
                            // Check if loggedInUser is available and filter out their information
                            loggedInUser && user._id !== loggedInUser._id && (
                                <li key={user._id}
                                    className="list-group-item d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <CgProfile style={{ fontSize: '30px', marginRight: '10px' }} />
                                        <p className="mb-0">{user.username}</p>
                                    </div>
                                    <button className="btn btn-success rounded-5"
                                            onClick={() => handleFriendRequest(user._id)}>Add Friend
                                    </button>
                                </li>
                            )
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AddUserFriends;
