// Contains all end points matching /api/conference/*

const express = require("express");
const Conference = require('../../models/conferenceModel');
const ConferenceService = require("../../services/ConferenceService");
const AuthService = require("../../services/AuthService");
const UuidService = require("../../services/UuidService");
const JwtService = require("../../services/JwtService");
const config = require('config');
let router = express.Router();

/** POST /api/conference/post
 @body: title String, body String
 @return:
 - 200 OK: Conference is successfully created and uploaded to the database.
 - 400 BAD REQUEST: If the request is improperly formatted.
 */
router.post('/post', AuthService.validateCookie, async (req, res) => {
    // creates new conference on the forum
    let user = await JwtService.getUserFromJwt(req.cookies.session_id);
    if (!req.body.title || !req.body.zoomLink || !req.body.passcode || !req.body.meetingId) {
        return res.status(400).json({msg: "Please fill out all fields"});
    }
    const post = new Conference();
    post.conId = UuidService.generateUuid();
    post.uid = user.get("uid");
    post.title = req.body.title;
    post.zoomLink = req.body.zoomLink;
    post.passcode = req.body.passcode;
    post.meetingId = req.body.meetingId;
    post.likes = 0;
    if (req.body.date) {
        var parsedDate = Date.parse(req.body.date);
        if (isNaN(parsedDate) == true) {
            return res.status(400).json({msg: "Date is invalid"});
        }
        post.date = req.body.date;
        post.expiryDate = new Date(post.date.getTime() + 86400000);
    }
    post.save();

    res.status(200).send({
        msg: 'Conference Created Succesfully'
    });
});

/** POST /api/conference/search
 @body: query String
 @return:
 - 200 OK: Conference's that have not yet expired with query matching any substring of the title have been located, then sorted by expiry date, will be sent as a response.
 - 400 BAD REQUEST: If the query field does not exist in the request.
 - 404 NOT FOUND: If no non-expired conferences are found with query matching a substring of the title.
 */
router.post('/search', async (req, res) => {
    // search for conferences that are not yet expired
    if(req.body.query === undefined) {
        return res.status(400).json({msg: "Please fill out all fields"});
    }

    if (req.body.query === "") {
        const query = Conference.find({expiryDate: {$gte: Date.now()}}, async (err, data) => {
            if (err){
                console.log(err);
                res.status(500).send();
            }else{
                res.status(200).send(data);
            }
        }).sort({expiryDate: 1});
    } else {
        const query = Conference.find({title: {"$regex": req.body.query, "$options": "i"}, expiryDate: {$gte: Date.now()}}, async (err, data) => {
            if (err){
                res.status(500).send();
            }else{
                res.status(200).send(data);
            }
        }).sort({expiryDate: 1});
    }
});


/** POST /api/conference/get-conference
 @body: conId String
 @return:
 - 200 OK: Conference matching conId has been located and will be sent as a response.
 - 400 BAD REQUEST: If the conId field does not exist in the request.
 - 404 NOT FOUND: No conference found with the specified conId.
 */
 router.post("/get-conference", async (req, res) => {
    if(!req.body.conId){
        return res.status(400).json({msg: "conId is a required field"});
    }

    Conference.find({conId: req.body.conId}, {_id: 0}, async (err, data) => {
        if(err) console.log(err);
        
        if (data.length === 1) {
            let found_conference = data[0]; 
            res.status(200).send(found_conference);
        } else {
            res.status(404).send({
                msg: 'CONFERENCE NOT FOUND'
            });
        }
    })
});

/** POST /api/conference/signature
 @body: meetingNumber Number, role Number (0-1)
 @return:
 - 200 OK: signature created by the provided meetingNumber and role.
 - 400 BAD REQUEST: If the meetingNumber or role field does not exist in the request.
 */
router.post("/signature", AuthService.validateCookie, async (req, res) => {
    if(req.body.meetingNumber === undefined || req.body.role === undefined) {
        return res.status(400).json({msg: "Meeting number and Role are required"});
    }

    let signature = ConferenceService.generateSignature(config.get("ZOOM_API_KEY"), config.get("ZOOM_SECRET_KEY"), req.body.meetingNumber, req.body.role);

    res.status(200).send({
        "signature": signature
    });
});


module.exports = router;