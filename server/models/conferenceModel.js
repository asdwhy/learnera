const mongoose = require('mongoose');

const conferenceSchema = new mongoose.Schema({
        conId: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        uid: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        meetingId: {
            type: String,
            required: true
        },
        expiryDate: {
            type: Date,
            default: new Date().setDate(new Date().getDate() + 1)
        },
        date: {
            type: Date,
            default: Date.now
        },
        zoomLink: {
            type: String,
            required: true
        },
        passcode: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false
    });

module.exports = mongoose.model('conferences', conferenceSchema);