const express = require("express");
const router = express.Router();
const { User } = require("../../models");

router.get("/", async (req, res) => {
    try {
        // this probably doesn't need to be in here but I guess it's a check that at least one user exists.
        const userData = await User.findAll();
        if (!userData) {
            res.status(400).json({ message: "No users." });
        }

        const users = userData.map((user) => user.get({ plain: true }));

        res.render("login", {
            title: "Current Users",
            header_title: "The Tech Blog",
            // as above users isn't actually required by the page at this point
            users,
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
