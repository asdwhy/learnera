const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    jwt: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    uid: {
        type: String,
        required: true,
        unique: true,
        index: true
    }
},
{
    versionKey: false
});

module.exports = mongoose.model('auths', authSchema);