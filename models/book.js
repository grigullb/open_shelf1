"use strict";
let Bookshelf = require('../database');

// require('./books');
var Book = Bookshelf.Model.extend({
  tableName: 'books',
  hasTimeStamps: true, 

}); 

module.exports = Book;