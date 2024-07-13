const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    organizer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: String,
    date: {
        type: Date,
        required: true
    },
    attendees: [{
        attendee: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        RSVPstatus: {
            type: String,
            enum: ['going', 'maybe', 'not going'],
            default: 'not going'
        }
    }],
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Event', EventSchema);
