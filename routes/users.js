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
      .select('users.firstname')
      .where('books.id', req.params.bookid)
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