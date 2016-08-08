"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 3000;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const exphbs      = require('express-handlebars');
const passport    = require('passport');
const session     = require('express-session');
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();
  
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const booksRoutes = require("./routes/books");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

// Cookie session requirements for passport
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
})); 
app.use(passport.initialize());
app.use(passport.session());

// Passport strategy - Local (is this still needed necessarily)
passport.use(new LocalStrategy(
  function(email, password, done) {
    User.findOne({email: email}, function(err, user){
      if err { return done(err); };
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));



// Views and page display
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));
app.use("/api/books", booksRoutes(knex));

// Home page
app.get("/", (req, res)=>{
	res.render("home");
});

//New User Sign-Up
app.get("/users/new", (req, res) => {
  res.render("user/new");
});

//User Profile
app.get("/users/:user_id", (req, res) => {
  res.render("user/profile", {userId: req.params.user_id});
});

//Login Page
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) =>{       //this is calling a function, correct? 
  User.findOne({ email: req.body.email }, function(err, user) {
    if (!user) {
      res.render('login', { error: 'Invalid email or password.' });
    } else {
      if (req.body.password === user.password) {
        //this should set the cookie session with the user info itself 
        req.session.user = user;
        res.redirect('/dashboard');
      } else {
        res.render('login', { error: 'Invalid email or password.' });
      }
    }
  });
});

//New Book Submission
app.get("/new", (req, res) => {
  res.render("submit");
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
