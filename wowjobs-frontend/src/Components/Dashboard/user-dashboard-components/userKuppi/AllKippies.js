import React, {useEffect, useState} from 'react';
import {Button, Card, Form, Modal} from 'react-bootstrap';
import axios from 'axios';

export default function AllKuppies() {
    const [showPostModal, setShowPostModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [category, setCategory] = useState('');
    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [kuppiQuestions, setKuppiQuestions] = useState([]);
    const [loggedInUserId, setLoggedInUserId] = useState('');
    const [selectedKuppiId, setSelectedKuppiId] = useState(null);

    useEffect(() => {
        fetchKuppiQuestions();
        setLoggedInUserId(localStorage.getItem('userID'));
    }, []);

    const fetchKuppiQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:8070/api/users/kuppies');
            setKuppiQuestions(response.data.filter(kuppi => kuppi.type === 'solution'));
        } catch (error) {
            console.error('Error fetching Kuppi questions:', error);
        }
    };

    const handlePostSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8070/api/users/kuppi', {
                author: loggedInUserId,
                type: 'solution',
                category,
                topic,
                description
            });
            alert('Kuppi posted successfully!');
            setShowPostModal(false);
            fetchKuppiQuestions();
        } catch (err) {
            setError('Failed to post Kuppi. Please try again.');
            console.error('Kuppi Post Error:', err);
        }
    };

    const handleUpdateSubmit = async () => {
        try {
            const response = await axios.put(`http://localhost:8070/api/users/kuppi/${selectedKuppiId}`, {
                category,
                topic,
                description
            });

            alert(response.data.message);
            setShowUpdateModal(false);
            fetchKuppiQuestions();
        } catch (error) {
            console.error('Error updating Kuppi post:', error);
            alert('Failed to update Kuppi post. Please try again.');
        }
    };

    const handleDelete = async (postId) => {
        try {
            const response = await axios.delete(`http://localhost:8070/api/users/kuppi/${postId}`);
            alert(response.data.message);
            fetchKuppiQuestions();
        } catch (error) {
            console.error('Error deleting Kuppi post:', error);
            alert('Failed to delete Kuppi post. Please try again.');
        }
    };

    const handlePostModalClose = () => {
        setShowPostModal(false);
        setCategory('');
        setTopic('');
        setDescription('');
        setError('');
    };

    const handleUpdateModalClose = () => {
        setShowUpdateModal(false);
        setCategory('');
        setTopic('');
        setDescription('');
        setError('');
        setSelectedKuppiId(null);
    };

    return (
        <div className="container mt-5 mb-5 bg-light p-5 rounded rounded-5">
            <center>
                <Button variant="outline-success" className="w-50 p-3" onClick={() => setShowPostModal(true)}>Add Kuppi</Button>
            </center>

            <Modal show={showPostModal} onHide={handlePostModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Kuppi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handlePostSubmit}>
                        <Form.Group controlId="formCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" placeholder="Enter category" value={category}
                                          onChange={(e) => setCategory(e.target.value)} required/>
                        </Form.Group>

                        <Form.Group controlId="formTopic">
                            <Form.Label>Topic</Form.Label>
                            <Form.Control type="text" placeholder="Enter topic" value={topic}
                                          onChange={(e) => setTopic(e.target.value)} required/>
                        </Form.Group>

                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Enter description"
                                          value={description}
                                          onChange={(e) => setDescription(e.target.value)} required/>
                        </Form.Group>

                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                    {error && <p className="mt-3 text-danger">{error}</p>}
                </Modal.Body>
            </Modal>

            {/* Update Kuppi Modal */}
            <Modal show={showUpdateModal} onHide={handleUpdateModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Kuppi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpdateSubmit}>
                        <Form.Group controlId="formCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" placeholder="Enter category" value={category}
                                          onChange={(e) => setCategory(e.target.value)} required/>
                        </Form.Group>

                        <Form.Group controlId="formTopic">
                            <Form.Label>Topic</Form.Label>
                            <Form.Control type="text" placeholder="Enter topic" value={topic}
                                          onChange={(e) => setTopic(e.target.value)} required/>
                        </Form.Group>

                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Enter description"
                                          value={description}
                                          onChange={(e) => setDescription(e.target.value)} required/>
                        </Form.Group>

                        <Button variant="primary" type="submit">Update</Button>
                    </Form>
                    {error && <p className="mt-3 text-danger">{error}</p>}
                </Modal.Body>
            </Modal>

            {/* Display Kuppi questions */}
            <div className="mt-4">
                <h2 className="text-center mb-4"><span className="text-danger">Ku</span><span
                    className="text-success">ppi</span></h2>
                <div className="d-flex flex-wrap justify-content-center">
                    {kuppiQuestions.map((kuppi) => (
                        <Card key={kuppi._id} className="m-3" style={{width: '18rem'}}>
                            <Card.Body>
                                <Card.Title>{kuppi.category}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{kuppi.topic}</Card.Subtitle>
                                <Card.Text>{kuppi.description}</Card.Text>
                            </Card.Body>
                            {kuppi.author === loggedInUserId && (
                                <Card.Footer>
                                    <Button variant="warning" onClick={() => {
                                        setCategory(kuppi.category);
                                        setTopic(kuppi.topic);
                                        setDescription(kuppi.description);
                                        setSelectedKuppiId(kuppi._id);
                                        setShowUpdateModal(true);
                                    }}>Update</Button>
                                    <Button variant="danger" className="ms-2"
                                            onClick={() => handleDelete(kuppi._id)}>Delete</Button>
                                </Card.Footer>
                            )}
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
