"use strict";

require('dotenv').config();
require('./database');
const PORT         = process.env.PORT || 3000;
const ENV          = process.env.ENV || "development";
const express      = require("express");
const exphbs       = require('express-handlebars');
const passport     = require('passport');
const session      = require('express-session');
const cookieParser = require('cookie-parser')
const bodyParser   = require("body-parser");
const sass         = require("node-sass-middleware");
const flash        = require('connect-flash');
require('./config/passport')(passport);
const app          = express();
  
//some of this is replicated in ./database.js, can be replaced later
const knexConfig   = require("./knexfile");
const knex         = require("knex")(knexConfig[ENV]);
const morgan       = require('morgan');
const knexLogger   = require('knex-logger');
const bookshelf    = require('bookshelf')(knex);

// Seperated Routes for each Resource
const usersRoutes  = require("./routes/users");
const booksRoutes  = require("./routes/books");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

// Sessions requirements for passport
app.use(passport.initialize());
app.use(passport.session());

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

//Login Page
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", 
  passport.authenticate('local-login'),
  function(req, res) {
    res.redirect('/users/' + req.user.id);
}); 

//New User Sign-Up
app.get("/users/new", (req, res) => {
  res.render("user/new");
});

// process the signup form
// app.post("/users/new", 
//   passport.authenticate('local-signup',
//   function(req, res) {
//     res.redirect('/users/' + req.user.id);
// }));

app.post("/users/new", passport.authenticate('local-signup', {
    successRedirect : '/', // redirect to the homepage for testing purposes
    failureRedirect : '/users/new' // redirect back to the signup page if there is an error
}));

//User Profile
app.get("/users/:user_id", (req, res) => {
  res.render("user/profile", {userId: req.params.user_id});
});

// app.get('/profile', isLoggedIn, function(req, res) {
//       res.render('profile.ejs', {
//           user : req.user // get the user out of session and pass to template
//       });
//   });

// Logout is handled by passport req.logout
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

//New Book Submission
app.get("/new", (req, res) => {
  res.render("submit");
});

app.post("/new", (req, res) => {
  res.redirect("/books/new");
});

// New book
app.get("/books/new", (req, res) => {
  res.render("book/new");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

// function isLoggedIn(req, res, next) {

//     // if user is authenticated in the session, carry on 
//     if (req.isAuthenticated())
//         return next();

//     // if they aren't redirect them to the home page
//     res.redirect('/');
// }
