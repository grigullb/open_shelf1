"use strict";
let Bookshelf = require('../database');

// require('./books');
var User = Bookshelf.Model.extend({
  tableName: 'users',
  hasTimeStamps: true, 

  // validPassword: function(password) {
  //   console.log(password);
  //   console.log(this.attributes.password);
  //   return bcrypt.compareSync(password, this.attributes.password);
  // },

  // testing purposes 
  validPassword:  function(password){
      return (password === this.attributes.password);
  }

}); 

// module.exports = Bookshelf.model('User', User);
module.exports = User;


