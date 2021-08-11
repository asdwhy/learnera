// Contains all end points matching /api/user/*
const express = require("express");
let router = express.Router();

const AuthService = require("../../services/AuthService");
const UuidService = require("../../services/UuidService");
const JwtService = require("../../services/JwtService");
const CookieService = require('../../services/CookieService');
const UserService = require('../../services/UserService');
const UserType = require('../../enums/UserType');
const Auth = require('../../models/authModel');

const User = require('../../models/userModel');
const Comment = require('../../models/commentModel');

const bcrypt = require('bcrypt');

/** POST /api/user/login
 @body: username String, password String
 @return:
 - 200 OK: A user was found matching the username password combination and a token is granted.
 - 401 UNAUTHORIZED: A user was not found matching the username password combination, so access is denied.
 */
router.post("/login", async (req, res) => {
    if(!req.body.username || !req.body.password){
        return res.status(400).json({msg: "Please fill out all fields"});
    }

    User.find({username: req.body.username}, async (err, data) => {
        if(err) console.log(err);

        if (data.length === 1) {
            let found_user = data[0]; 

            const passwordValid = await bcrypt.compare(req.body.password, found_user.password);
            if(!passwordValid){
                res.status(401).send({
                    msg: 'LOGIN FAILED'
                });
                return;
            }
            
            let jwt = JwtService.generateAuthJwt(found_user);

            AuthService.saveAuthDocument(found_user, jwt);
            CookieService.sendCookie(res, jwt);

            res.status(200).send({
                msg: 'LOGIN SUCESSFUL'
            });

        } else {
            res.status(401).send({
                msg: 'LOGIN FAILED'
            });
        }
    })
});

/** POST /api/user/register
 @body: username String, password String, firstName String, lastName String OR companyName String, phone Number, ownerId String.
 @desc: Creates a BFS user. If authenticated as a BFS user, ability to create company accounts is enabled.
 @return:
 - 200 OK: A user is created with the information provided.
 */
router.post('/register', async (req, res) => {
    // creates new user
    if(!req.body.username || !req.body.password){
        return res.status(400).json({msg: "Please fill out all fields"});
    }

    // General user fields
    var new_user = new User();
    new_user.uid = UuidService.generateUuid();
    new_user.username = req.body.username;
    const hashedPass = await bcrypt.hash(req.body.password, 5);
    new_user.password = hashedPass;

    if(req.body.type == UserType.company) {

        // Find authenticated user
        let owner = await JwtService.getUserFromJwt(req.cookies.session_id);

        // Required company fields
        if(owner == null || owner == undefined) {
            return res.status(401).json({msg: "You need to be authenticated to create a company user"});
        }
        if(!req.body.address || !req.body.type || !req.body.companyName){
            return res.status(400).json({msg: "Please fill out all fields"});
        }

        // Complete user with company fields
        new_user = UserService.createCompanyUser(new_user, req, owner);
    } else {

        //  Required personal fields
        if(!req.body.firstName || !req.body.lastName){
            return res.status(400).json({msg: "Please fill out all fields"});
        }
        // Complete user with personal fields
        new_user = UserService.createPersonalUser(new_user, req);
    }
    
    new_user.save((err, user) => {
        if(err) {
            console.log(err);
            res.status(409).send({
                msg: 'Username already in use'
            });
        } else {
            res.status(200).send({
                msg: 'User Created Succesfully'
            });
        }
    });
});

/** POST /api/user/me
 @body:
 @return:
 - 200 OK: The information of the currently loged in user is provided as a response.
 */
router.get('/me', AuthService.validateCookie, async (req, res) => {
    let user = await JwtService.getUserFromJwt(req.cookies.session_id);
    res.status(200).send(user);
});

/** POST /api/user/updateuser
 @body: username String, firstName String, lastName
 @return:
 - 200 OK: A user was found matching the token and the information is updated using the request body.
 - 400 BAD REQUEST: If the request is improperly formatted.
 - 401 UNAUTHORIZED: A user was not found matching the current token.
 */
router.put('/updateuser', AuthService.validateCookie, async (req, res) => {
    // updates an existing user
    if(!req.body.username || !req.body.firstName || !req.body.lastName || !req.body.profileImageUrl){
        return res.status(400).json({msg: "Please fill out all fields"});
    }
    let user = await JwtService.getUserFromJwt(req.cookies.session_id);

    if(user.type == UserType.company) {
        return res.status(400).json({msg: "Only personal accounts can be updated"});
    }

    if (!user){
        res.status(404).send({
            msg: 'User Not Found'
        });
        return;
    }
    
    if(UserService.imageExists(req.body.profileImageUrl)){
        user.profileImageUrl = req.body.profileImageUrl;
    } else {
        return res.status(400).json({msg: "Invalid image link"});
    }
    user.username = req.body.username;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    
    user.save((err, user) => {
        if(err) {
            res.status(409).send({
                msg: 'Username already in use'
            });
        } else {
            res.status(200).send({
                msg: 'User Updated Succesfully'
            });

            Comment.find({ uid: user.get("uid") }, (err, data) => {
                for(let i in data) {
                    let comment = data[i];
                    comment.firstName = req.body.firstName;
                    comment.lastName = req.body.lastName;
                    comment.save();
                }
            });
        }
    });
});

/** POST /api/user/get-user
 @body: uid String
 @return:
 - 200 OK: User matching uid has been located and will be sent as a response.
 - 400 BAD REQUEST: If the uid field does not exist in the request.
 - 404 NOT FOUND: No users found with the specified uid.
 */
router.post("/get-user", async (req, res) => {
    if(!req.body.uid){
        return res.status(400).json({msg: "Please select a user"});
    }

    User.find({uid: req.body.uid}, {password: 0, username: 0, _id: 0}, async (err, data) => {
        if(err) console.log(err);

        if (data.length === 1) {
            let found_user = data[0];
            res.status(200).send(found_user);
        } else {
            res.status(404).send({
                msg: 'USER NOT FOUND'
            });
        }
    })
});

/** POST /api/user/logout
 @body: uid String
 @return:
 - 200 OK: JWT has been successfully removed from the database 
 - 401 Not Authenticated: User is not currently logged in
 - 500 INTERNAL SERVER: Error with the database query
 */
router.post("/logout", AuthService.validateCookie, async (req, res) => {
    Auth.findOneAndDelete({jwt: req.cookies.session_id}, async (err, data)=>{
        if(err){
            console.log(err);
            res.status(500).send();
        }else{
            res.clearCookie("session_id");
            res.status(200).send({
                msg: "LOGOUT SUCCESSFUL"
            });
        }
    })
});


module.exports = router;