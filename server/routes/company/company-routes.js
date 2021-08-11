// Contains all end points matching /api/company/*

const express = require("express");
const User = require('../../models/userModel');
let router = express.Router();

/** POST /api/company/get-companies
 @body: uid String
 @return:
 - 200 OK: Companies owned by uid as a response
 - 400 BAD REQUEST: If the uid field does not exist in the request.
 - 404 NOT FOUND: No companies owned by the specified uid.
 */
router.post("/get-companies", async (req, res) => {
    if(!req.body.uid){
        return res.status(400).json({msg: "uid is a required field"});
    }

    User.find({ownerId: req.body.uid}, {password: 0, username: 0, _id: 0}, async (err, data) => {
        if(err) console.log(err);
        if (data.length >= 1) {
            let found_thread = data;
            res.status(200).send(found_thread);
        } else {
            res.status(404).send({
                msg: 'No companies found'
            });
        }
    });
});

module.exports = router;