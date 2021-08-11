const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    vid: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    uid: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    title:
    {
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    categories:{
        type: [String],
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    likes:{
        type: Number,
        default: 0
    }
},
{
    versionKey: false
});

module.exports = mongoose.model('videos', videoSchema);
