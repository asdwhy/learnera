const Auth = require('../models/authModel');
const JwtService = require('./JwtService');
const AuthService = require('./AuthService');

// Middle-ware for authenticated HTTP requests
// Ensures that the jwt from a cookie exists in the auth collection,
// and is verified with the secret key
module.exports.validateCookie = async function validateCookie(req, res, next) {
    const { cookies } = req;

    if('session_id' in cookies) {
        // find correct jwt in auths collection
        let token = cookies.session_id;

        let tokenExists = await Auth.findOne({ jwt: cookies.session_id }).exec();

        if(tokenExists != null && JwtService.verifyJwt(token)){
            next();
            return;
        }
    }

    res.status(401).send({msg: "Not Authenticated"});
}

// Query Auths collection for document with matching uid
module.exports.docExists = async function (uid) {
    let user = await Auth.findOne({ uid: uid }).exec();

    return user;
}

// Creates a new document in the auths table for specfied user document,
// with the specified jwt.
// If one already exists, it will update the existing document
module.exports.saveAuthDocument = async function (user, jwt) {
    let authDoc = await AuthService.docExists(user.uid);
    if(authDoc == null) { // Token for user d.n.e.
        const new_auth = new Auth();
        new_auth.jwt = jwt;
        new_auth.uid = user.uid;
        new_auth.save();
    } else { // token for user exists already
        authDoc.jwt = jwt;
        await authDoc.save();
    }
}