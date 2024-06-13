const express = require("express");
const router = express.Router();
const { Comment } = require("../../models");

// create new comment
router.post("/", async (req, res) => {
    try {
        // add new comment to db
        const commentData = await Comment.create({
            content: req.body.content,
            blogPost_id: req.body.blogPost_id,
            user_id: req.session.user_id,
        });

        res.status(200).json(commentData);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
