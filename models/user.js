let Bookshelf = require('../database');
const bcrypt  = require('bcrypt-nodejs');

// require('./books');
var User = Bookshelf.Model.extend({
  tableName: 'users',
  hasTimeStamps: true,

  generateHash: function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  },
  
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

module.exports = Bookshelf.model('User', User);


