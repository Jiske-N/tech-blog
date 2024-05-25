const express = require('express');
const app = express();
const path = require('path');
const routes = require('./controllers');
const { User } = require('./models');

app.get('/api/members', async (req, res) => {
  const members = await User.findAll();
  res.status(200).json(members);
});

app.get('/api/members/:id', async (req, res) => {
  const member = await User.findByPk(req.params.id);
  res.status(200).json(member);
});

app.use(express.static(path.join(__dirname, 'views')));

// app.use(routes);

const PORT = process.env.PORT || 6543;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
