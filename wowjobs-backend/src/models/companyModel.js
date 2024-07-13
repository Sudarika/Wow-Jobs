const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    companyName: {
        type: String,
        required: true,
        unique: true
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
        description: String,
        location: String,
        industry: String,
        companySize: Number,
        websiteUrl: String
    },
    jobsPosted: [{
        type: Schema.Types.ObjectId,
        ref: 'Job'
    }],
    userType: {
        type: String,
        enum: ['user', 'company', 'institute', 'admin'],
        default: 'company'
    }
});

module.exports = mongoose.model('Company', CompanySchema);
