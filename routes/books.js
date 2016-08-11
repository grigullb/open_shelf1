const express = require('express');
const router  = express.Router();


module.exports = (knex) => {

  router.post("/", (req, res) =>{
    console.log('submitting book');
    console.log(req.body.title);
    knex('books').insert({title: req.body.title})
      .then( function (result) {
          res.json({ success: true, message: 'ok' });     // respond back to request
       });
  });

  router.get("/search/:filter/:term", (req, res) => {
    if (req.params.filter === 'genre'){
      knex('books')
      .join('genres', 'books.genre_id', '=', 'genres.id')
      .select('books.title', 'books.id')
      .where('genres.genre', 'like','%'+req.params.term+'%')
      .then(function(results){
        res.json(results);
        console.log(results);
      });
    } 
    if (req.params.filter === 'author'){
      knex('books')
      .join('authors', 'books.author_id', '=', 'authors.id')
      .select('books.title', 'books.id')
      .where('authors.first_name', 'like','%'+req.params.term+'%')
      .orWhere('authors.first_name', 'like','%'+req.params.term+'%')
      .then(function(results){
        res.json(results);
        console.log(results);
      });
    } 
    if (req.params.filter === 'title'){
      knex('books')
      .select('books.title', 'books.id')
      .where('books.title', 'like','%'+req.params.term+'%')
      .then(function(results){
        res.json(results);
        console.log(results);
      });
    } 

  });

	router.get("/user_books/:id", (req, res) => {
    knex
      .select("*")
      .from("books")
      .where('id', req.params.id)
      .then((results) => {
        res.json(results);
    });
  });
	return router;
}


