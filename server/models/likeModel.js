const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    target: {
        type: String,
        required: true
    }
},
{
    versionKey: false
});

module.exports = mongoose.model('likes', likeSchema);