"use strict";
let Bookshelf = require('../database');

var Interest = Bookshelf.Model.extend({
  tableName: 'user_interests',
  hasTimeStamps: true,

}); 

module.exports = Interest;