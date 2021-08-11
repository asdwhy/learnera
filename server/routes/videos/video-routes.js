// Contains all end points matching /api/videos/*
const express = require("express");
let router = express.Router();
const UuidService = require("../../services/UuidService");
const AuthService = require("../../services/AuthService");
const VideoService = require("../../services/VideoService");
const JwtService = require("../../services/JwtService");
const Video = require('../../models/videoModel');
/** GET /api/videos/get-categories
 @body:
 @return:
 - 200 OK: Sends the categories of E-Learning videos as the response body.
 */
router.get("/get-categories", async (req, res) => {
    res.status(200).json({
        categories: VideoService.categories
    });
});

/** POST /api/video/upload
 @body: title String, body String
 @return:
 - 200 OK: Video is successfully created and uploaded to the database.
 - 400 BAD REQUEST: If the request is improperly formatted.
 */
router.post('/upload', AuthService.validateCookie, async (req, res) => {
    let user = await JwtService.getUserFromJwt(req.cookies.session_id);
    if(!req.body.title || !req.body.body || !req.body.url || !req.body.categories){
        return res.status(400).json({msg: "Please fill out all fields"});
    }
    const video = new Video();
    video.vid = UuidService.generateUuid();
    video.uid = user.get("uid");
    video.title = req.body.title;
    video.body = req.body.body;
    video.url = req.body.url;
    video.categories = req.body.categories;
    video.likes = 0;
    video.date = Date.now();
    video.save();
    
    res.status(200).send({
        msg: 'Video uploaded succesfully'
    });
});

/** POST /api/video/search
 @body: query String
 @return:
 - 200 OK: Threads with query matching a substring of the title have been located and will be sent as a response.
 - 400 BAD REQUEST: If the query field does not exist in the request.
 - 404 NOT FOUND: If no threads are found with query matching a substring of the title.
 */
 router.post('/search', async (req, res) => {
    // creates new thread on the forum
    if(req.body.query === undefined || req.body.category === undefined) {
        return res.status(400).json({msg: "Please fill out all fields"});
    }

    if (req.body.query === "" && req.body.category === ""){
        const query = Video.find({}, async (err, data) => {
            if (err) console.log(err);
            res.status(200).send(data);
        });
    }
    else if (req.body.query === "" && req.body.category != "") {
        const query = Video.find({categories: req.body.category }, async (err, data) => {
            if (err) console.log(err);
            res.status(200).send(data);
        });
    }
    else if (req.body.query != "" && req.body.category === ""){
        const query = Video.find({title: {"$regex": req.body.query, "$options": "i"}}, async (err, data) => {
            if (err) console.log(err);
            res.status(200).send(data);
        });
    }
    else {
        const query = Video.find({title: {"$regex": req.body.query, "$options": "i"}, categories: req.body.category}, async (err, data) => {
            if (err) console.log(err);
            res.status(200).send(data);
        });
    }
});

/** POST /api/video/get-video
 @body: vid String
 @return:
 - 200 OK: Video matching vid has been located and will be sent as a response.
 - 400 BAD REQUEST: If the vid field does not exist in the request.
 - 404 NOT FOUND: No threads found with the specified vid.
 */
 router.post("/get-video", async (req, res) => {
    if(!req.body || !req.body.vid){
        return res.status(400).json({msg: "A \'vid\' is required"});
    }

    Video.find({vid: req.body.vid}, async (err, data) => {
        if(err) console.log(err);
        
        if (data.length === 1) {
            let found_video = data[0]; 
            res.status(200).send(found_video);
        } else {
            res.status(404).send({
                msg: 'VIDEO NOT FOUND'
            });
        }
    })
});


module.exports = router;