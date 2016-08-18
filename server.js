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
// main application
const app          = express();
// connection with sockets 
const http         = require('http').Server(app);
const io           = require('socket.io')(http);
// socket clients 
const clients = {};

=======
const http         = require('http').Server(app);
// const io           = require('socket.io')(http);
//some of this is replicated in ./database.js, can be replaced later
const knexConfig   = require("./knexfile");
const knex         = require("knex")(knexConfig[ENV]);
const morgan       = require('morgan');
const knexLogger   = require('knex-logger');
const bookshelf    = require('bookshelf')(knex);
const Promise   = require('bluebird');

// Seperated Routes for each Resource
const usersRoutes  = require("./routes/users");
const booksRoutes  = require("./routes/books");
const messagesRoutes  = require("./routes/messages");
const bcrypt  = require('bcrypt-nodejs');



// paths to database models 
let Book = require('./models/book');
let Author = require('./models/author');
let Genre = require('./models/genre');
let Interest = require('./models/interests');

// let onlineUsers = {};

// let onlineUsers = {};

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
app.use("/api/messages", messagesRoutes(knex, notifyUsers));

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

app.post("/books/create", isLoggedIn, function(req, res){
  Promise.all([createNewBookData(req), seekInterests(req)]).then(function(){
    res.redirect("/users/" + req.user.id );
  });
});

//New message
// app.get('/messages', function(req, res){
//   res.render("messages/new", {
 //     scripts: ['socket.io-client/socket.io.js']
//   });
// });

app.get("/user_verification", function(req, res) {
  res.json(req.user ? req.user.id : false)
})

function seekInterests(req){
  return new Promise(function(resolve, reject){
    var author = req.body.author;
    var genre = req.body.genre;
    var title = req.body.title; 
    var results = [];
    knex.select('user_id').from('user_interests')
    .whereIn('interest', [author, genre, title]).then( function(data){
      for(var i=0;i<data.length;i++){
        results.push(data[i].user_id);
      }
      console.log(results);
      resolve(results);
    });
  })
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
      return next();
    } else {
      res.redirect('/login');
    }
}


function createNewBookData(req){
  return new Promise(function (resolve, reject){
    Promise.all([getGenreData(req), getAuthorData(req)]).then(function(values){
      var newBook = Book.forge({
        title: req.body.title,
        isbn: req.body.isbn,
        user_id: req.user.id,     // to be refactored to take the user id from the req.user field. 
        author_id: values[1],
        genre_id: values[0]
      }).save().then( function(model){
        resolve(model);
      });
    });
  });
}

function getGenreData(req) { 
  return new Promise(function (resolve, reject) {
     Genre.where({ 'genre': req.body.genre }).fetch()
      .then( function(model) {
        if (model) {
          var genreID = model.get('id');
          resolve(genreID);   
        }
        else {
        Genre.forge({
          genre: req.body.genre
        })
        .save()
        .then( function(model){
          var genreID = model.get('id');
          resolve(genreID);
        });
      }
    });
  });
}

function getAuthorData(req) { 
  return new Promise(function (resolve, reject) {
     Author.where({ 'author': req.body.author }).fetch()
      .then( function(model) {
        if (model) {
          var authorID = model.get('id');
          resolve(authorID);   
        }
        else {
        Author.forge({
          author: req.body.author
        })
        .save()
        .then( function(model){
          var authorID = model.get('id');
          resolve(authorID);
        });
      }
    });
  });
}

io.on('connection', function(socket){
  var user_id
  socket.on('user', function(id) {
    if (!clients[id]) {
      clients[id] = [];
    }
    user_id = id;
    clients[id].push(socket);
  })
  socket.on('disconnect', function(){
    var c = clients[user_id];
    if (c && c.indexOf(socket) !== -1) {
      c.splice(c.indexOf(socket), 1)
    }
  })
});

function notifyUsers(user_ids, message) {
  user_ids.forEach(function(user_id) {
    var sockets = clients[user_id];
    if (sockets && sockets.length) {
      sockets.forEach(function(socket) {
        socket.emit('notification', message);
      })
    }
  })
}

http.listen(PORT, () => {
  console.log("OpenShelf listening on port " + PORT);
});
