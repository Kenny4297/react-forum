const Like = require('../models/Like');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

module.exports = {

    // GET api/likes/posts/:postId
    async getLikesForPost(req, res) {
        console.log("getLikesForPost firing!")
        try {
            const postId = req.params.postId;
            const likes = await Like.findAll({
                where: {
                    post_id: postId,
                },
                include: [
                    { model: User, as: 'user' },
                    { model: Post, as: 'post' }
                ],
            });
    
            if (likes.length === 0) { // Check if the likes array is empty
                return res.status(404).json({ message: "No likes found for this post." });
            }
    
            res.json(likes);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
    


    // POST api/likes/posts/
    async createLikeForPost(req, res) {
        console.log("createLikeForPost firing!")
        try {
            const newLike = await Like.create({
                user_id: req.body.user_id,
                post_id: req.params.postId
            });

            res.status(201).json(newLike);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    // DELETE api/likes/posts/
    async deleteLikeForPost(req, res) {
        console.log("deleteLikeForPost firing!")
        try {
            const deletedLike = await Like.destroy({
                where: {
                    user_id: req.body.user_id,
                    post_id: req.params.postId,
                }
            });
            res.json(deletedLike);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

     // GET api/likes/comments/:commentId
     async getLikesForComment(req, res) {
        console.log("getLikesForComment firing!")
        try {
            const commentId = req.params.commentId;
            console.log(`Fetching likes for comment ID: ${commentId}`); // log commentId
            const likes = await Like.findAll({
                where: {
                    comment_id: commentId,
                },
                include: [
                    { model: User, as: 'user' },
                    { model: Comment, as: 'comment' }
                ],
            });
    
            console.log(`Fetched likes: ${JSON.stringify(likes)}`); 

            res.json(likes);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },   
    
    

    // POST api/likes/comments/:commentId
    async createLikeForComment(req, res) {
        console.log("createLikeForComment firing!")
        console.log(req.session);

        try {
            const newLike = await Like.create({
                user_id: req.session.userId,  
                comment_id: req.params.commentId
            });

            res.status(201).json(newLike);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    // DELETE api/likes/comments/:commentId
    async deleteLikeForComment(req, res) {
        console.log("deleteLikeForComment firing!")
        try {
            const deletedLike = await Like.destroy({
                where: {
                    user_id: req.body.user_id,
                    comment_id: req.params.commentId,
                }
            });
            res.json(deletedLike);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }

};
