const { User } = require('../models');

const userData = [
  {
    name: 'Xandromus',
    email: 'xandromus@gmail.com',
    password: 'Password1234!',
  },
  {
    name: 'Lernantino',
    email: 'lernantino@hotmail.com',
    password: 'Password1234!',
  },
  {
    name: 'Shannon Jackson',
    email: 'shannon@gmail.com',
    password: 'Password1234!',
  },
];

const seedUsers = () => {
  console.log('seedUsers function started');
  User.bulkCreate(userData);
};

module.exports = seedUsers;
