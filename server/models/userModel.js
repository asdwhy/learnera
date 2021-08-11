const mongoose = require('mongoose');
const UserType = require('../enums/UserType');

const userSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    profileImageUrl:{
        type: String,
        default: 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
    },
    ownerId: {
        type: String,
        required: this.type === UserType.company
    },
    password: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: this.type === UserType.company
    },
    firstName: {
        type: String,
        required: this.type === UserType.personal
    },
    lastName: {
        type: String,
        required: this.type === UserType.personal
    },
    address: {
        line1: String,
        city: String,
        province: String,
        postalCode: String,
        country: String,
        required: this.type === UserType.company
    },
    phone: {
        type: String
    },
    website: {
        type: String
    },
    type: {
        type: String,
        enum: UserType,
        default: UserType.personal,
        required: true
    }
},
{
    versionKey: false
});

module.exports = mongoose.model('users', userSchema);