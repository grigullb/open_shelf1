"use strict";
let Bookshelf = require('../database');

var Genre = Bookshelf.Model.extend({
  tableName: 'genres',
  hasTimeStamps: true,

}); 

module.exports = Genre;