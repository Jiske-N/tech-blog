const router = require("express").Router();
const homeRoutes = require("./homeRoutes");
const loginRoutes = require("./user/loginRoutes");
const signupRoutes = require("./user/signupRoutes");
const dashboardRoutes = require("./dashboard/dashboardRoutes");
const apiRoutes = require("./api");

// currently have the authorisation on the individual requests within the requisite pages
// might be better to just place them on the entire routes below

router.use("/", homeRoutes);
router.use("/comment", homeRoutes);
router.use("/login", loginRoutes);
router.use("/signup", signupRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/api", apiRoutes);

module.exports = router;
