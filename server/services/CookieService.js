const config = require('config');

// Sends cookie with jwt as 'session_id'
module.exports.sendCookie = function (res, jwt) {
    res.cookie('session_id', jwt, config.get('COOKIE_OPTIONS'));
}
