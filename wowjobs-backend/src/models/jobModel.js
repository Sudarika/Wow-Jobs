const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    employer: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
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
    requirements: [String],
    applicationInstructions: String,
    location: String,
    industry: String,
    jobType: String,
    applicants: [{
        applicant: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        applicationDate: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected'],
            default: 'pending'
        }
    }],
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Job', JobSchema);
