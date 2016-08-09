"use strict";

require('dotenv').config();

const PORT         = process.env.PORT || 3000;
const ENV          = process.env.ENV || "development";
const express      = require("express");
const exphbs       = require('express-handlebars');
const passport     = require('passport');
const LocalStrategy= require('passport-local').Strategy;
const session      = require('express-session');
const cookieParser = require('cookie-parser')
const bodyParser   = require("body-parser");
const sass         = require("node-sass-middleware");
const flash        = require('connect-flash');
const app          = express();
  
const knexConfig   = require("./knexfile");
const knex         = require("knex")(knexConfig[ENV]);
const morgan       = require('morgan');
const knexLogger   = require('knex-logger');
const bookshelf    = require('bookshelf')(knex);

// Seperated Routes for each Resource
const usersRoutes  = require("./routes/users");
const booksRoutes  = require("./routes/books");

// Database Models through Bookshelf
var User = bookshelf.Model.extend({
  tableName: 'users';
});

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

// Sessions requirements for passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(email, password, done) {
    User.findWhere({ email: email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// Cookie requirements for passport
app.use(bodyParser.json()); 
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
})); 

// Views and page display
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));


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

app.post("users/new"), (req, res) => {
  res.redirect("users/profile")
}

//User Profile
app.get("/users/:user_id", (req, res) => {
  res.render("user/profile", {userId: req.params.user_id});
});

//Login Page
app.get("/login", (req, res) => {
  res.render("login");
});

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/user/profile');
});

//New Book Submission
app.get("/new", (req, res) => {
  res.render("submit");
});

app.post("/new", (req, res) => {
  res.redirect("/new");
});

// New book
app.get("/books/new", (req, res) => {
  res.render("book/new");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
