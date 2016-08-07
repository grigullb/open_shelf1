"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 3000;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const exphbs      = require('express-handlebars');
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

app.get("/users/new", (req, res) => {
  res.render("user/new");
});

app.get("/users/:user_id", (req, res) => {
  res.render("user/profile", {userId: req.params.user_id});
});

app.get("/new", (req, res) => {
  res.render("submit");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
