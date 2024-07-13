const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConsultantSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        bio: String,
        expertise: [String],
        experience: [{
            company: String,
            position: String,
            duration: String
        }]
    },
    slots: [{
        date: Date,
        startTime: String,
        endTime: String,
        availability: Boolean,
        booked: String,
    }],
    slotReq: [{
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        details: String,
        message: String
    }],
    acceptedReq: [{
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        details: String,
        message: String
    }],
    rejectedReq: [{
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        details: String,
        message: String
    }],
    userType: {
        type: String,
        enum: ['user', 'company', 'institute', 'admin', 'consultant'],
        default: 'consultant'
    },
});

module.exports = mongoose.model('Consultant', ConsultantSchema);
