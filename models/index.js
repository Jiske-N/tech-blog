const User = require('./User');
const BlogPost = require('./blogPost');

// users have many BlogPosts
User.hasMany(BlogPost, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

BlogPost.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = {
  User,
  BlogPost,
};
