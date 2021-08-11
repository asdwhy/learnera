const Like = require('../models/likeModel');

/**
 * Finds and returns a like by user UID to a target
 * @param {User ID of the user who has liked} uid 
 * @param {ID of the target video/thread/comment/etc} target 
 * @returns the like object if the user has liked the target, null otherwise
 */
module.exports.getLike = async function getLike(uid, target){
    let like = await Like.findOne({uid: uid, target: target}).exec();
    return like;
}
/**
 * Creates a new like entry in the likes collection if the user has not already liked
 * the target, if the user has already liked the target then removes the like from
 * the likes collection
 * @param {User ID of the user who has liked} uid 
 * @param {ID of the target video/thread/comment/etc} target 
 * @returns True if a like is created, False if a previously created like has been removed.
 */
module.exports.changeLike = async function changeLike(uid, target){
    const like = await this.getLike(uid, target);

    if(like){
        like.remove();
        return false;
    }else{
        const like = new Like();
        like.uid = uid;
        like.target = target;
        like.save();
        return true;
    }
}
