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

	router.get("/:id", (req, res) => {
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


