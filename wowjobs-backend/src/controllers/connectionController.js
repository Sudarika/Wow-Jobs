const Connection = require('../models/connectionModel');
const User = require('../models/userModel');
const auth = require('../middleware/auth');
const validation = require('../middleware/validation');

exports.createConnection = async (req, res) => {
    const {error} = validation.validateConnectionCreation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user1 = await User.findById(req.body.user1);
    if (!user1) return res.status(404).send('User1 not found');

    const user2 = await User.findById(req.body.user2);
    if (!user2) return res.status(404).send('User2 not found');

    const connection = new Connection({
        user1: user1._id,
        user2: user2._id
    });

    try {
        const savedConnection = await connection.save();
        res.send({connection: savedConnection._id});
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.viewConnections = async (req, res) => {
    const connections = await Connection.find();
    res.send(connections);
};

exports.updateConnection = async (req, res) => {
    const {error} = validation.validateConnectionCreation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const updatedConnection = await Connection.findByIdAndUpdate(req.params.connectionId, req.body, {new: true});
    if (!updatedConnection) return res.status(404).send('Connection not found');
    res.send(updatedConnection);
};

exports.deleteConnection = async (req, res) => {
    const deletedConnection = await Connection.findByIdAndRemove(req.params.connectionId);
    if (!deletedConnection) return res.status(404).send('Connection not found');
    res.send('Connection deleted');
};
