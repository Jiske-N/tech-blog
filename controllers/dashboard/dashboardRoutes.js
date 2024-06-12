const express = require("express");
const router = express.Router();
const { BlogPost, User, Comment } = require("../../models");

// might be easier to add the authorisation to the ../index.js for all dashboard routes
const checkAuthorisation = require("../../utils/authorisation");

// display dashboard with all users blog posts
router.get("/", checkAuthorisation, async (req, res) => {
    try {
        const user = req.session.user_id;

        // get all blog posts
        console.log(user);
        const blogPostData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
            ],
        });

        const blogPostsPlain = blogPostData.map((post) =>
            post.get({ plain: true })
        );
        const blogPosts = blogPostsPlain.filter(
            (post) => post.user_id === user
        );

        res.render("dashboard", {
            blogPosts,
            header_title: "Your Dashboard",
            logged_in: req.session.logged_in,
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

// get/render new post form
router.get("/new-post", checkAuthorisation, (req, res) => {
    try {
        res.render("new-post", {
            header_title: "Your Dashboard",
            logged_in: req.session.logged_in,
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

// get/render edit post form
router.get("/edit-post/:id", checkAuthorisation, async (req, res) => {
    try {
        // identify post by id/pk
        const blogPostData = await BlogPost.findByPk(req.params.id);

        const blogPost = blogPostData.get({ plain: true });

        res.render("edit-post", {
            blogPost,
            header_title: "Your Dashboard",
            logged_in: req.session.logged_in,
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
