const express = require('express');
const app = express();
const path = require('path');
const routes = require('./controllers');

const exphbs = require('express-handlebars');

app.use(express.static(path.join(__dirname, 'views')));

// handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

const PORT = process.env.PORT || 6543;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
