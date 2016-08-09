const express = require('express');
const router  = express.Router();


module.exports = (knex) => {

  router.post("/", (req, res) =>{
    console.log('submitting book');
    console.log(req.body.title);
    knex('books').insert({title: req.body.title, id: 12})
      .then( function (result) {
          res.json({ success: true, message: 'ok' });     // respond back to request
       });
  });

  router.get("/search/:filter/:term", (req, res) => {
    knex
      .select("*")
      .from(req.params.filter+"s")
      .where('id', 1)
      .then((results) => {
        res.json(results);
        console.log(results);
    });
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


