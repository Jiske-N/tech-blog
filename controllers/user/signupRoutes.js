const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        res.render("signup", {
            title: "Current Users",
            header_title: "The Tech Blog",
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
