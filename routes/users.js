"use strict";

const express = require('express');
const router  = express.Router();



module.exports = (knex) => {

	router.get("/:id/books", (req, res) => {
    knex
      .select("*")
      .from("books")
      .where('user_id', req.params.id)
      .then((results) => {
        res.json(results);
    });
  });

  router.get("/books/:bookid", (req, res) => {
    knex('users')
      .join('books', 'users.id', '=', 'books.user_id')
      .select('users.firstname', 'users.id')
      .where('books.id', req.params.bookid)
      .then(function(results){
        console.log(results);
        res.json(results);
      });
  });

  router.get("/genre_preferences/:userid", (req, res) => {
    knex('genres')
      .join('genre_interests', 'genres.id', '=', 'genre_interests.genre_id')
      .select('genres.genre')
      .where('genre_interests.user_id', req.params.userid)
      .then(function(results){
        console.log(results);
        res.json(results);
      });
  });

  router.get("/author_preferences/:userid", (req, res) => {
    knex('authors')
      .join('author_interests', 'authors.id', '=', 'author_interests.author_id')
      .select('authors.first_name', 'authors.last_name')
      .where('author_interests.user_id', req.params.userid)
      .then(function(results){
        console.log(results);
        res.json(results);
      });
  });

  router.get("/:id", (req, res) => {
    knex
      .select("*")
      .from("users")
      .where('id', req.params.id)
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}