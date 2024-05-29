const express = require('express');
const router = express.Router();
const { Comment } = require('../../models');

// create new comment
router.post('/', async (req, res) => {
  try {
    console.log('commentRoutes createNew started', req.body.blogPost_id);
    const commentData = await Comment.create({
      content: req.body.content,
      blogPost_id: req.body.blogPost_id,
      user_id: req.session.user_id,
    });
    // console.log('commentRoutes createNew', commentData);

    res.status(200).json(commentData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
