const sequelize = require('../config/connection');
const seedUsers = require('./userSeeds');
const seedPosts = require('./postSeeds');

console.log('Seed file initialising');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  console.log('\n Database Synced \n');
  await seedUsers();
  console.log('\n Users Seeded \n');

  await seedPosts();
  console.log('\n Posts Seeded \n');

  // process.exit(0);
};

seedDatabase();
