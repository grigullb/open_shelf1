"use strict";
let Bookshelf = require('../database');

var Author = Bookshelf.Model.extend({
  tableName: 'authors',
  hasTimeStamps: true 

}); 

module.exports = Author;