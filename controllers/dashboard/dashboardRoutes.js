const express = require('express');
const router = express.Router();
const { BlogPost, User, Comment } = require('../../models');

// display dashboard with all users blog posts
router.get('/', async (req, res) => {
  try {
    // console.log('dashboardRoutes', 'get triggered');
    // console.log('dashboardRoutes', blogPostData2);
    const user = req.session.user_id;
    // get all blog posts
    console.log(user);
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // console.log('dashboardRoutes blogPostData', blogPostData);

    const blogPostsPlain = blogPostData.map((post) =>
      post.get({ plain: true })
    );
    const blogPosts = blogPostsPlain.filter((post) => post.user_id === user);

    // const blogPosts = blogPostData.get({ plain: true });

    // console.log('dashboardRoutes blogPosts', blogPosts);

    res.render('dashboard', {
      blogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// get/render new post form
router.get('/new-post', (req, res) => {
  try {
    console.log('new-postRoutes', 'get triggered');
    res.render('new-post');
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
