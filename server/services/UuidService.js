const { v4: uuidv4 } = require('uuid');

module.exports.generateUuid = function () {
    return uuidv4();
}