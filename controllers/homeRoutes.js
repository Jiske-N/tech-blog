const express = require('express');
const router = express.Router();
const { BlogPost, User } = require('../models');

// display homepage with all blog posts
router.get('/', async (req, res) => {
  try {
    // console.log('homeRoutes', 'get triggered');
    // console.log('homeRoutes', blogPostData2);

    // get all blog posts
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // console.log('homeRoutes blogPostData', blogPostData);

    const blogPosts = blogPostData.map((project) =>
      project.get({ plain: true })
    );

    // console.log('homeRoutes blogPosts', blogPosts);

    res.render('homepage', {
      blogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// display comment page (variation of homepage) with a single post and the option to comment
router.get('/comment/:id', async (req, res) => {
  try {
    // console.log('homeRoutes', 'get triggered');
    // console.log('homeRoutes', blogPostData2);

    // get all blog posts
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // console.log('homeRoutes blogPostData', blogPostData);

    const blogPost = blogPostData.get({ plain: true });

    // console.log('homeRoutes blogPosts', blogPosts);

    res.render('comment', {
      blogPost,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
