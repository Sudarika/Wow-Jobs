import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CgProfile } from "react-icons/cg";

const ShowUserFriends = () => {
    const [friendRequests, setFriendRequests] = useState([]);
    const [friends, setFriends] = useState([]);
    const [error, setError] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const fetchLoggedInUser = async () => {
            try {
                const response = await axios.get('http://localhost:8070/api/users/profile');
                setLoggedInUser(response.data);
            } catch (error) {
                setError('Error fetching user information.');
            }
        };

        const fetchFriendRequests = async () => {
            try {
                const response = await axios.get('http://localhost:8070/api/users/friend-requests');
                setFriendRequests(response.data);
            } catch (error) {
                setError('Error fetching friend requests.');
            }
        };

        const fetchUserFriends = async () => {
            try {
                const response = await axios.get('http://localhost:8070/api/users/friends');
                setFriends(response.data);
            } catch (error) {
                setError('Error fetching user friends.');
            }
        };

        fetchLoggedInUser();
        fetchFriendRequests();
        fetchUserFriends();
    }, []);

    const handleAcceptRequest = async (senderId) => {
        try {
            await axios.put('http://localhost:8070/api/users/accept-friend-request', { senderId });
            setFriendRequests(friendRequests.filter(request => request._id !== senderId));
        } catch (error) {
            setError('Error accepting friend request.');
        }
    };

    const handleRejectRequest = async (senderId) => {
        try {
            await axios.put('http://localhost:8070/api/users/reject-friend-request', { senderId });
            setFriendRequests(friendRequests.filter(request => request._id !== senderId));
        } catch (error) {
            setError('Error rejecting friend request.');
        }
    };

    const handleDeleteFriend = async (friendId) => {
        try {
            const token = localStorage.getItem('auth-token');
            const response = await axios.delete(
                'http://localhost:8070/api/users/delete-friend',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        friendId: friendId
                    }
                }
            );
            setFriends(friends.filter(friend => friend._id !== friendId));
            console.log('Friend deleted:', response.data);
        } catch (error) {
            console.error('Error deleting friend:', error);
            setError('Error deleting friend.');
        }
    };




    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <h2>Friend Requests</h2>
                {friendRequests.length === 0 && <p>No friend requests.</p>}
                {error && <p className="text-danger">{error}</p>}
                <ul className="list-group">
                    {friendRequests.map((request) => (
                        <li key={request._id} className="list-group-item d-flex justify-content-between align-items-center">
                            <CgProfile className="text-center" style={{ fontSize: '20px' }} /><p style={{ marginTop: '10px' }}> {request.username}</p>
                            <div>
                                <button className="btn btn-success me-2" onClick={() => handleAcceptRequest(request._id)}>Accept</button>
                                <button className="btn btn-danger" onClick={() => handleRejectRequest(request._id)}>Reject</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="row">
                <h2 className="mt-5">My Friends</h2>
                {error && <p className="text-danger">{error}</p>}
                {friends.length > 0 ? (
                    <ul className="list-group">
                        {friends.map((friend) => {
                            if (loggedInUser && friend._id !== loggedInUser._id) {
                                return (
                                    <li key={friend._id} className="list-group-item d-flex justify-content-between align-items-center">
                                        <CgProfile className="text-center" style={{ fontSize: '20px' }} /><p style={{ marginTop: '10px' }}> {friend.username}</p>
                                        <button className="btn btn-danger rounded-5" onClick={() => handleDeleteFriend(friend._id)}>Delete Friend</button>
                                    </li>
                                );
                            } else {
                                return null;
                            }
                        })}
                    </ul>
                ) : (
                    <p>No friends</p>
                )}
            </div>
        </div>
    );
};

export default ShowUserFriends;
