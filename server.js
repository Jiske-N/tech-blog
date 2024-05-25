const express = require('express');
const app = express();
const path = require('path');
const routes = require('./controllers');

app.use(express.static(path.join(__dirname, 'views')));

app.use(routes);

const PORT = process.env.PORT || 6543;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
