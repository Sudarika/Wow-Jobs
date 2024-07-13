const Event = require('../models/eventModel');
const User = require('../models/userModel');
const auth = require('../middleware/auth');
const validation = require('../middleware/validation');

exports.createEvent = async (req, res) => {
    const {error} = validation.validateEventCreation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send('User not found');

    const event = new Event({
        organizer: user._id,
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        date: req.body.date
    });

    try {
        const savedEvent = await event.save();
        res.send({event: savedEvent._id});
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.viewEvents = async (req, res) => {
    const events = await Event.find();
    res.send(events);
};

exports.updateEvent = async (req, res) => {
    const {error} = validation.validateEventCreation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const updatedEvent = await Event.findByIdAndUpdate(req.params.eventId, req.body, {new: true});
    if (!updatedEvent) return res.status(404).send('Event not found');
    res.send(updatedEvent);
};

exports.deleteEvent = async (req, res) => {
    const deletedEvent = await Event.findByIdAndRemove(req.params.eventId);
    if (!deletedEvent) return res.status(404).send('Event not found');
    res.send('Event deleted');
};
