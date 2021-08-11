const jwtService = require('jsonwebtoken');
const config = require('config');
const secret = config.get('JWT_SECRET_KEY');
const User = require('../models/userModel');

// Generates a Jwt token for a specified user
module.exports.generateAuthJwt = function (user) {
    let data = {
        uid: user.uid,
    };

    const jwt = jwtService.sign(data, secret);

    return jwt;
}

// Decodes the user from the Jwt token
module.exports.getUserFromJwt = async function (jwt) {
    try {
        let decoded = jwtService.verify(jwt, secret);
        let user = await User.findOne({ uid: decoded.uid }).exec();
        return user;
    } catch (e) {
        return null;
    }
}

// Verifies the jwt with the secret key. Returns true if verified, false otherwise
module.exports.verifyJwt = function (jwt) {
    
    try {
        jwtService.verify(jwt, secret);
        return true;
    }catch (e) {
        return false;
    }
}