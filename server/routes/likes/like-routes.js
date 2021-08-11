// Contains all end points matching /api/message/*

const express = require("express");
const Like = require('../../models/likeModel');
const Thread = require('../../models/threadModel');
const Video = require('../../models/videoModel');
const Comment = require('../../models/commentModel');
const AuthService = require("../../services/AuthService");
const JwtService = require("../../services/JwtService");
const LikeService = require("../../services/LikeService");
let router = express.Router();

/** POST /api/like/thread
 @body: target String
 @return:
 - 200 OK: Thread has successfully been liked or unliked
 - 400 BAD REQUEST: If the request is improperly formatted.
 */
router.post('/thread', AuthService.validateCookie, async (req, res) =>{
    if(!req.body.target){
        return res.status(400).json({msg: "Please send like target!"});
    }
    let user = await JwtService.getUserFromJwt(req.cookies.session_id);

    let exists = await LikeService.changeLike(user.uid, req.body.target);

    if(exists){
        Thread.findOneAndUpdate({tid: req.body.target}, {$inc: {'likes': 1}}, {new:true}, async (err, data) => {
            if(err){
                console.log(err)
                return;
            };
            if(!data){
                res.status(400).send({"msg": "Incorrect tid"});
                return;
            }
            res.status(200).send({"msg": "Thread Liked"});
        })
    }else{
        Thread.findOneAndUpdate({tid: req.body.target}, {$inc: {'likes': -1}}, {new:true}, async (err, data) => {
            if(err){
                console.log(err)
                return;
            };
            if(!data){
                res.status(400).send({"msg": "Incorrect tid"});
                return;
            }
            res.status(200).send({"msg": "Thread Unliked"});
        })
    }
    
});

/** POST /api/like/video
 @body: target String
 @return:
 - 200 OK: Video has successfully been liked or unliked
 - 400 BAD REQUEST: If the request is improperly formatted.
 */
router.post('/video', AuthService.validateCookie, async (req, res) =>{
    if(!req.body.target){
        return res.status(400).json({msg: "Please send like target!"});
    }
    let user = await JwtService.getUserFromJwt(req.cookies.session_id);

    let exists = await LikeService.changeLike(user.uid, req.body.target);

    if(exists){
        Video.findOneAndUpdate({vid: req.body.target}, {$inc: {'likes': 1}}, {new:true}, async (err, data) => {
            if(err){
                console.log(err)
                return;
            };
            if(!data){
                res.status(400).send({"msg": "Incorrect vid"});
                return;
            }
            res.status(200).send({"msg": "Video Liked"});
        })
    }else{
        Video.findOneAndUpdate({vid: req.body.target}, {$inc: {'likes': -1}}, {new:true}, async (err, data) => {
            if(err){
                console.log(err)
                return;
            };
            if(!data){
                res.status(400).send({"msg": "Incorrect vid"});
                return;
            }
            res.status(200).send({"msg": "Video Unliked"});
        })
    }
    
});



/** POST /api/like/comment
 @body: target String
 @return:
 - 200 OK: Comment has successfully been liked or unliked
 - 400 BAD REQUEST: If the request is improperly formatted.
 */
router.post('/comment', AuthService.validateCookie, async (req, res) =>{
    if(!req.body.target){
        return res.status(400).json({msg: "Please send like target!"});
    }
    let user = await JwtService.getUserFromJwt(req.cookies.session_id);

    let exists = await LikeService.changeLike(user.uid, req.body.target);

    if(exists){
        Comment.findOneAndUpdate({cid: req.body.target}, {$inc: {'likes': 1}}, {new:true}, async (err, data) => {
            if(err){
                console.log(err)
                return;
            };
            if(!data){
                res.status(400).send({"msg": "Incorrect cid"});
                return;
            }
            res.status(200).send({"msg": "Comment Liked"});
        })
    }else{
        Comment.findOneAndUpdate({cid: req.body.target}, {$inc: {'likes': -1}}, {new:true}, async (err, data) => {
            if(err){
                console.log(err)
                return;
            };
            if(!data){
                res.status(400).send({"msg": "Incorrect cid"});
                return;
            }
            res.status(200).send({"msg": "Comment Unliked"});
        })
    }
});

/** POST /api/like/hasLiked
 @body: target String
 @return:
 - 200 OK: Return whether or not the user has liked a target thread/video/comment/etc
 - 400 BAD REQUEST: If the request is improperly formatted.
 */
router.post('/hasLiked', AuthService.validateCookie, async (req, res) => {
    if(!req.body.target){
        return res.status(400).json({msg: "Please send like target!"});
    }
    let user = await JwtService.getUserFromJwt(req.cookies.session_id);
    let like = await LikeService.getLike(user.uid, req.body.target);
    res.status(200).send(like != null);
});

module.exports = router;