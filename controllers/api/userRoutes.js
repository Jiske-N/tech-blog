const express = require("express");
const router = express.Router();
const { User } = require("../../models");

// create new user
router.post("/", async (req, res) => {
    try {
        // add new user to db
        const userData = await User.create(req.body);

        // add new user to session
        req.session.user_id = userData.id;
        req.session.logged_in = true;

        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json(error);
    }
});

// existing user login
router.post("/login", async (req, res) => {
    try {
        // locate user in the database
        const userData = await User.findOne({
            // name is used here because the mockup requested it.
            // email would probably be better suited.
            where: { name: req.body.name },
        });

        // check they exist
        if (!userData) {
            res.status(400).json({
                message: "Incorrect email or password, please try again",
            });
            return;
        }

        // check password against password in db
        const validatePassword = await userData.checkPassword(
            req.body.password
        );

        // check passwords do match
        if (!validatePassword) {
            res.status(400).json({
                message: "Incorrect email or password, please try again",
            });
            return;
        }

        // update session with newly logged in user
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: "You are now logged in!" });
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

// logout user
router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
