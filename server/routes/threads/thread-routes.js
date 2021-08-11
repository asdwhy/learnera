// Contains all end points matching /api/thread/*

const express = require("express");
const Thread = require('../../models/threadModel');
const User = require('../../models/userModel');
const AuthService = require("../../services/AuthService");
const UuidService = require("../../services/UuidService");
const JwtService = require("../../services/JwtService");
let router = express.Router();

/** POST /api/thread/post
 @body: title String, body String
 @return:
 - 200 OK: Thread is successfully created and uploaded to the database.
 - 400 BAD REQUEST: If the request is improperly formatted.
 */
router.post('/post', AuthService.validateCookie, async (req, res) => {
    // creates new thread on the forum
    let user = await JwtService.getUserFromJwt(req.cookies.session_id);
    if(!req.body.title || !req.body.body){
        return res.status(400).json({msg: "Please fill out all fields"});
    }
    const post = new Thread();
    post.tid = UuidService.generateUuid();
    post.uid = user.get("uid");
    post.title = req.body.title;
    post.body = req.body.body;
    post.likes = 0;
    post.date = Date.now();
    post.save();

    res.status(200).send({
        msg: 'Thread Created Succesfully'
    });
});

/** POST /api/thread/search
 @body: query String
 @return:
 - 200 OK: Threads with query matching a substring of the title have been located and will be sent as a response.
 - 400 BAD REQUEST: If the query field does not exist in the request.
 - 404 NOT FOUND: If no threads are found with query matching a substring of the title.
 */
router.post('/search', async (req, res) => {
    // creates new thread on the forum
    if(req.body.query === undefined) {
        return res.status(400).json({msg: "Please fill out all fields"});
    }

    if (req.body.query === "") {
        const query = Thread.find({}, async (err, data) => {
            if (err) console.log(err);
            res.status(200).send(data);
        });
    } else {
        const query = Thread.find({title: {"$regex": req.body.query, "$options": "i"}}, async (err, data) => {
            if (err) console.log(err);
            res.status(200).send(data);
        });
    }
});

/** POST /api/thread/get-thread
 @body: tid String
 @return:
 - 200 OK: Thread matching tid has been located and will be sent as a response.
 - 400 BAD REQUEST: If the tid field does not exist in the request.
 - 404 NOT FOUND: No threads found with the specified tid.
 */
router.post("/get-thread", async (req, res) => {
    if(!req.body.tid){
        return res.status(400).json({msg: "Please select a thread"});
    }

    Thread.find({tid: req.body.tid}, async (err, data) => {
        if(err) console.log(err);
        
        if (data.length === 1) {
            let found_thread = data[0]; 
            res.status(200).send(found_thread);
        } else {
            res.status(404).send({
                msg: 'THREAD NOT FOUND'
            });
        }
    })
});


module.exports = router;