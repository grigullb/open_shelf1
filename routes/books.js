"use strict";
const express = require('express');
const router = express.Router();
const pg = require('pg');


let Genre = require('../models/genre');
let Author = require('../models/author');


module.exports = (knex, notifyUsers) => {

  router.post("/", (req, res) =>{
    // if the author already exists, don't insert to the author table  TODO: what if there's multiple authors?
    var authorInput = req.body.author.split(' ');
    Genre.where({ 'genre':  req.body.genre }).fetch().then( function(existingGenre) {
        if (!existingGenre) {
          knex('genres').insert({ genre: req.body.genre }).then(function (result){
            res.json({ success: true, message: 'genre added' });
          });
        }
    });
    Author.where({ 'first_name':  authorInput[0], 'last_name': authorInput[authorInput.length -1] })
      .fetch().then( function(existingAuthor) {
        if (!existingAuthor) {
          knex.insert({first_name: authorInput[0],last_name: authorInput[authorInput.length -1]}).into('authors').then(function (result){
            res.json({ success: true, message: 'author added' });
          });
        }
    });
    knex('books').insert({title: req.body.title})
      .then( function (result) {
          notifyUsers([req.body.receiverId], "You've got mail!")
          res.json({ success: true, message: 'title added' });     // respond back to request
    });
  });

  router.get("/search/:filter/:term", (req, res) => {
    if (req.params.filter === 'genre'){
      knex('books')
      .join('genres', 'books.genre_id', '=', 'genres.id')
      .select('books.title', 'books.id', 'books.condition')
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
      .where('books.title', 'like','%'+req.params.term.toLowerCase()+'%')
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


