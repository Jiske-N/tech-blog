const express = require('express');
const router = express.Router();
const { BlogPost, User, Comment } = require('../models');

// display dashboard with all users blog posts
router.get('/', async (req, res) => {
  try {
    // console.log('homeRoutes', 'get triggered');
    // console.log('homeRoutes', blogPostData2);
    const user = req.session.logged_in;
    // get all blog posts
    const blogPostData = await BlogPost.findByPk(user, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // console.log('homeRoutes blogPostData', blogPostData);

    const blogPosts = blogPostData.map((post) => post.get({ plain: true }));

    console.log('homeRoutes blogPosts', blogPosts);

    res.render('dashboard', {
      blogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
