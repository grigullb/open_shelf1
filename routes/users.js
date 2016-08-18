"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

	router.get("/:id/books", (req, res) => {
    knex
      .select("*")
      .from("books")
      .where('user_id', req.user.id)
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
        res.json(results);
      });
  });

  router.get("/interests/:userid", (req, res) => {
    knex('users')
      .join('user_interests', 'users.id', '=', 'user_interests.user_id')
      .select('user_interests.type', 'user_interests.interest')
      .where('user_interests.user_id', req.user.id)
      .then(function(results){
        res.json(results);
      });
  });

  router.get("/:id", (req, res) => {
    knex
      .select("*")
      .from("users")
      .where('id', req.user.id)
      .then((results) => {
        res.json(results);
    });
  });

  router.post("/interests", (req, res) => {
    knex('user_interests').insert({type: req.body.interest_type, interest: req.body.int_input, user_id: req.body.user.id})
      .then( function (result) {
          res.json({ success: true, message: 'interest added' });     // respond back to request
    });
  });
  return router;
}