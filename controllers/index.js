const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const loginRoutes = require('./loginRoutes');
const signupRoutes = require('./signupRoutes');
const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/comment', homeRoutes);
router.use('/login', loginRoutes);
router.use('/signup', signupRoutes);
router.use('/api', apiRoutes);

module.exports = router;
