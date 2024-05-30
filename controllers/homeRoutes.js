const express = require('express');
const router = express.Router();
const { BlogPost, User, Comment } = require('../models');

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

    const blogPosts = blogPostData.map((post) => post.get({ plain: true }));

    // console.log('homeRoutes blogPosts', blogPosts);

    res.render('homepage', {
      blogPosts,
      header_title: 'The Tech Blog',
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

    // get blog post by id
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

    // get all comments for post
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // console.log(commentData);
    // console.log('homeRoutes blogPostData', blogPostData);

    const commentsPlain = commentData.map((comment) =>
      comment.get({ plain: true })
    );
    const comments = commentsPlain.filter(
      (comment) => comment.blogPost_id === blogPost.id
    );

    // console.log(blogPost.id, commentsPlain);
    // console.log(blogPost, commentsPlain);

    res.render('comment', {
      blogPost,
      comments,
      header_title: 'The Tech Blog',
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
