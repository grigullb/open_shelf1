 var Faker = require('faker');
 var randomName = Faker.name.findName();

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({firstname: 'Chris', lastname: 'Smith', email: 'chrissmith@gmail.com', password: 'test', isAdmin: true}),
        knex('users').insert({firstname: 'Bob', lastname: 'Smith', password: 'test', email: 'bobsmith@gmail.com'}),
      ]);
    });
};
