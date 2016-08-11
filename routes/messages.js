const express = require('express');
const router  = express.Router();


module.exports = (knex) => {

  router.post("/", (req, res) =>{
    console.log(req.body.receiverId);
    knex('messages').insert({text: req.body.text, sender_id: req.body.senderId, reciever_id: req.body.receiverId})
      .then( function (result) {
          res.json({ success: true, message: 'ok' });     // respond back to request
  });
});
  router.get("/:id", (req, res) => {
    knex
      .select("*")
      .from("messages")
      .where('reciever_id', req.params.id)
      .then((results) => {
        res.json(results);
    });
  });

	return router;
}
