const express = require('express');
const router = express.Router();
const { BlogPost } = require('../../models');

// create new blog post
router.post('/', async (req, res) => {
  try {
    console.log('BlogPostRoutes createNew started');
    const BlogPostData = await BlogPost.create({
      content: req.body.content,
      title: req.body.title,
      user_id: req.session.user_id,
    });
    // console.log('BlogPostRoutes createNew', BlogPostData);

    res.status(200).json(BlogPostData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
