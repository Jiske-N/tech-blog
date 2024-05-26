const express = require('express');
const router = express.Router();
const { User } = require('../../models');

// router.get('/', async (req, res) => {
//   try {
//     const users = await User.findAll();
//     if (!users) {
//       res.status(400).json({ message: 'No users.' });
//     }
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll();
    if (!userData) {
      res.status(400).json({ message: 'No users.' });
    }

    const users = userData.map((user) => user.get({ plain: true }));

    res.render('login', {
      title: 'Current Users',
      users,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res
        .status(400)
        .json({ message: `No user the the id of ${req.params.id}` });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    if (!newUser) {
      res
        .status(400)
        .json({ message: `Couldn't create user ${req.body.name}` });
    }

    // res.redirect('/')
    res
      .status(200)
      // .json({ message: `User ${req.body.name} created` })
      .redirect('/api/users');
  } catch (error) {
    res.status(500).json(error);
  }
});

// router.put('/', async (req, res) => {
//   try {
//     const updatedUser = await User.update(req.body);

//     if (!newUser) {
//       res
//         .status(400)
//         .json({ message: `Couldn't create user ${req.body.name}` });
//     }

//     res.status(200).json({ message: `User ${req.body.name} created` });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

module.exports = router;
