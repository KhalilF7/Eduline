if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const local_auth = require('passport-local');
const session = require('express-session');
const User = require('./models/user');
const MongoDBStore = require('connect-mongodb-session')(session)
const userRoutes = require('./routes/users');
const forumRoutes = require('./routes/forums.js');
const mongoSanitize = require('express-mongo-sanitize');

const dbUrl = process.env.DB_URL || 'mongodb+srv://EDULINE:EDULINESDIRI@cluster0.lcx2y.mongodb.net/test';
mongoose.connect(dbUrl)

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database Connected");
})
const app = express();
const secret = process.env.SECRET || 'thisshouldbeabettersecret!';

const store = new MongoDBStore({
    url: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
})

const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
/*app.use(mongoSanitize());*/
//app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const bodyParser = require('body-parser');

app.use(bodyParser.json());
//////////////////////////////////////////////
passport.use(new local_auth(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/user', userRoutes);
app.use('/forums', forumRoutes);


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
});