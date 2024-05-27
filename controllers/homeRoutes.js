const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    res.render('homepage');
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
