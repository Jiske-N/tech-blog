const express = require("express");
const app = express();
const path = require("path");
const routes = require("./controllers");
const session = require("express-session");
const exphbs = require("express-handlebars");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const helpers = require("./utils/helpers");

const port = process.env.PORT || 6543;

// set up session to be used for user authorisation etc
const sess = {
    secret: process.env.SECRET,
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: "strict",
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// handlebars middleware
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

// sync database and start server
sequelize.sync({ force: false }).then(() => {
    app.listen(port, () => {
        console.log(`Now listening on port ${port}`);
    });
});
