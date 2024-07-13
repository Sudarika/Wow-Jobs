const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InstituteSchema = new Schema({
    instituteName: {
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
        websiteUrl: String
    },
    courses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }],
    userType: {
        type: String,
        enum: ['user', 'company', 'institute', 'admin'],
        default: 'institute'
    }
});

module.exports = mongoose.model('Institute', InstituteSchema);
