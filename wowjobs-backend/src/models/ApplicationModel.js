const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
    jobId: {
        type: String,
    },
    applicant: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cvURL: String,
    clURL: String
});

module.exports = mongoose.model('Application', ApplicationSchema);
