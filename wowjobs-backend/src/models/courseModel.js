const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    institute: {type: Schema.Types.ObjectId, ref: 'Institute'},
    title: {type: String, required: true},
    description: {type: String, required: true},
    syllabus: {type: String, required: true},
    enrollmentCriteria: {type: String, required: true},
    content: [{
        topic: {type: String, required: true},
        url: {type: String, required: true},
        completed: {type: Boolean, default: false}
    }]
});

module.exports = mongoose.model('Course', CourseSchema);
