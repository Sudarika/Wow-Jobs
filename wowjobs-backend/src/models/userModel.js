const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profile: {
        firstName: String,
        lastName: String,
        title: String,
        company: String,
        location: String,
        bio: String,
        education: [{
            institution: String,
            degree: String,
            fieldOfStudy: String,
            startYear: Number,
            endYear: Number
        }],
        skills: [String]
    },
    contact: {
        phone: String,
        address: String,
        linkedIn: String,
        twitter: String
    },
    userType: {
        type: String,
        enum: ['user', 'company', 'institute', 'admin'],
        default: 'user'
    },
    friendRequestsSent: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    friendRequestsReceived: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    enrolledCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
});

module.exports = mongoose.model('User', UserSchema);
