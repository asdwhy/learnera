// Contains all end points matching /api/comment/*

const express = require("express");
const Comment = require('../../models/commentModel');
const AuthService = require("../../services/AuthService");
const UuidService = require("../../services/UuidService");
const JwtService = require("../../services/JwtService");
const UserType = require('../../enums/UserType');
let router = express.Router();

/** POST /api/comment/post
 @body: id String, body String
 @return:
 - 200 OK: Comment is successfully created and uploaded to the database.
 - 400 BAD REQUEST: If the request is improperly formatted.
 */
router.post('/post', AuthService.validateCookie, async (req, res) => {
    // creates new comment on the forum
    let user = await JwtService.getUserFromJwt(req.cookies.session_id);
    if(!req.body.id || !req.body.body){
        return res.status(400).json({msg: "Please fill out all fields"});
    }
    const post = new Comment();
    post.cid = UuidService.generateUuid();
    post.id = req.body.id;
    post.uid = user.get("uid");

    if(user.type == UserType.company) {
        post.displayName = user.get("companyName");
    } else {
        post.displayName = user.get("firstName") + " " + user.get("lastName");
    }
    post.body = req.body.body;
    post.likes = 0;
    post.date = Date.now();
    post.save();

    res.status(200).send({
        msg: 'Comment Created Succesfully'
    });
});

/** POST /api/comment/get-comments
 @body: tid String
 @return:
 - 200 OK: Comments matching tid has been located and will be sent as a response.
 - 400 BAD REQUEST: If the tid field does not exist in the request.
 - 404 NOT FOUND: No threads found with the specified tid.
 */
router.post("/get-comments", async (req, res) => {
    if(!req.body.id){
        return res.status(400).json({msg: "Please select a thread"});
    }

    Comment.find({id: req.body.id}, async (err, data) => {
        if(err) console.log(err);
        if (data.length >= 1) {
            let found_thread = data;
            res.status(200).send(found_thread);
        } else {
            res.status(404).send({
                msg: 'THREAD NOT FOUND'
            });
        }
    });
});

module.exports = router;