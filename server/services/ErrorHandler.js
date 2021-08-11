module.exports.sendJsonError = function (res) {
    res.status(400).send({
        msg: 'Error while parsing body, ensure body is valid JSON object'
    });
}