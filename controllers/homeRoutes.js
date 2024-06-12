const express = require("express");
const router = express.Router();
const { BlogPost, User, Comment } = require("../models");

// display homepage with all blog posts
router.get("/", async (req, res) => {
    try {
        // get all blog posts
        const blogPostData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
            ],
        });

        const blogPosts = blogPostData.map((post) => post.get({ plain: true }));

        res.render("homepage", {
            blogPosts,
            header_title: "The Tech Blog",
            logged_in: req.session.logged_in,
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

// display comment page (variation of homepage) with a single post and the option to comment
router.get("/comment/:id", async (req, res) => {
    try {
        // get blog post by id
        const blogPostData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
            ],
        });

        const blogPost = blogPostData.get({ plain: true });

        // get all comments for post
        const commentData = await Comment.findAll({
            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
            ],
        });

        const commentsPlain = commentData.map((comment) =>
            comment.get({ plain: true })
        );
        const comments = commentsPlain.filter(
            (comment) => comment.blogPost_id === blogPost.id
        );

        res.render("comment", {
            blogPost,
            comments,
            header_title: "The Tech Blog",
            logged_in: req.session.logged_in,
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
