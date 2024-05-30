const express = require('express');
const router = express.Router();
const { BlogPost } = require('../../models');

// create new blog post
router.post('/', async (req, res) => {
  try {
    console.log('BlogPostRoutes createNew started');
    const blogPostData = await BlogPost.create({
      content: req.body.content,
      title: req.body.title,
      user_id: req.session.user_id,
    });
    // console.log('BlogPostRoutes createNew', blogPostData);

    res.status(200).json(blogPostData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update an existing blog post
router.put('/:id', async (req, res) => {
  try {
    console.log('BlogPostRoutes update started');
    const blogPostData = await BlogPost.update(
      {
        content: req.body.content,
        title: req.body.title,
      },
      { where: { id: req.params.id } }
    );
    // console.log('BlogPostRoutes createNew', blogPostData);

    res.status(200).json(blogPostData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete an existing blog post
router.delete('/:id', async (req, res) => {
  try {
    console.log('BlogPostRoutes delete started');
    const blogPostData = await BlogPost.destroy({
      where: { id: req.params.id },
    });
    // console.log('BlogPostRoutes createNew', blogPostData);

    res.status(200).json(blogPostData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
