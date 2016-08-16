"use strict";

require('dotenv').config();
require('./database');
const PORT         = process.env.PORT || 3000;
const ENV          = process.env.ENV || "development";
const express      = require("express");
const exphbs       = require('express-handlebars');
const session      = require('express-session');
const passport     = require('passport');
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
const messagesRoutes  = require("./routes/messages");
const bcrypt  = require('bcrypt-nodejs');
let Book = require('./models/book');
let Author = require('./models/author');
let Genre = require('./models/genre');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

// Cookie requirements for passport
app.use(bodyParser.json()); 
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
})); 
app.use(passport.initialize());
app.use(passport.session());

// Views and page display
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Flash message middleware
app.use(flash());

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
app.use("/api/messages", messagesRoutes(knex));

// Home page
app.get("/", (req, res)=>{
	res.render("home");
});

//Login Page
app.get("/login", (req, res) => {
  res.render("login", { messages: req.flash('loginMessage')});
});

app.post("/login", 
  passport.authenticate('local-login', { 
    failureRedirect : '/login',
    failureFlash: true 
  }), function(req, res) {
    res.redirect('users/' + req.user.id);
});

//New User Sign-Up
app.get("/users/new", (req, res) => {
  res.render("user/new", { messages: req.flash('signupMessage') });
});

app.post("/users/new", passport.authenticate('local-signup', {
    successRedirect : '/', // redirect to the homepage for testing purposes
    failureRedirect : '/users/new' // redirect back to the signup page if there is an error
}));

//User Profile

app.get('/users/:user_id', isLoggedIn, function(req, res) {
  res.render("user/profile", { userId: req.user.id });
});

// Logout is handled by passport req.logout
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

//New Book Submission
app.get("/books/new", (req, res) => {
  res.render("book/new");
});

app.post("/books/create", (req, res) => {
  createNewBookData(req, res);
  res.redirect("/books/new");
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()){
       return next();
    } else {
       res.redirect('/login');
    }
    // if they aren't redirect them to the home page
}

function createNewBookData(req, res) {
  var authorID; 
  var genreID;

  Genre.where({ 'genre': req.body.genre }).fetch().then( function(model) {
    if (model) {
      var genreID = model.get('id');
      forgeBook(req,res, genreID);
    } else {
      newGenre = Genre.forge({
        genre: req.body.genre
      })
      .save()
      .then( function(model){
        console.log(model);
        genreID = model.get('id');
        forgeBook(req,res, genreID);
      });
    }
  });
}
// function returnAuthorID() {
//   var author;
//   Author.where({ 'author': req.body.author }).fetch().then( function(model){
//     author = model.get('id');
//   }).then( function(result){
//     console.log(author);
//   });
// }
function forgeBook(req, res, genreID){
  console.log("Forging New Book ###########");
  var newBook = Book.forge({
      title: req.body.title,
      isbn: req.body.isbn,
      user: 2,
      author_id: 100,
      genre_id: genreID
  }); //.save 
  console.log(newBook);
}

