"use strict";
let Bookshelf = require('../database');

// require('./books');
var Book = Bookshelf.Model.extend({
  tableName: 'users',
  hasTimeStamps: true, 

}); 

module.exports = Book;