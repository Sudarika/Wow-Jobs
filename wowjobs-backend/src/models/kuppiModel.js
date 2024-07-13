const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KuppiSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['question', 'solution'],
        required: true
    },
    messages: [{
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        content: {
            type: String,
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Kuppi', KuppiSchema);
