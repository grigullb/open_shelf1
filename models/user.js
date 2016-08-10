let Bookshelf = require('../database');

// require('./books');
var User = Bookshelf.Model.extend({
  tableName: 'users',
  hasTimeStamps: true,

  generateHash: function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  },
  // validPassword: function(password) {
  //   return bcrypt.compareSync(password, this.password);
  // }

  // testing purposes 
  validPassword:  function(password){
      return (password === this.attributes.password);
  }

}); 

module.exports = Bookshelf.model('User', User);


