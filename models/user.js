const knexConfig   = require("./knexfile");
const knex         = require("knex")(knexConfig[ENV]);
const bookshelf    = require('bookshelf')(knex);
const bcrypt       = require('bcrypt-nodejs');

// require('./books');
var User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimeStamps: true.

  initialize: function() {
    this.on('saving', this.validateSave);
  },

  validateSave: function() {
    return checkit(rules).run(this.attributes);
  },

  // Likely future implementation 
  // books: function() {
  //   return this.hasMany('Books');
  // },
}, {
  login: Promise.method(function(email, password) {
    if (!email || !password) throw new Error('Email and password are both required');
    return new this({email: email.toLowerCase().trim()}).fetch({require: true}).tap(function(user) {
      return bcrypt.compareAsync(password, user.get('password'))
        .then(function(res) {
          if (!res) throw new Error('Invalid password');
        });
    });
  })
});

module.exports = Bookshelf.model('User', User);


