 var Faker = require('faker');
 var randomName = Faker.name.findName();

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, firstname: 'Chris', lastname: 'Smith', email: 'chrissmith@gmail.com', password: 'chrissmith', isAdmin: true}),
        knex('users').insert({id: 2, firstname: 'Bob', lastname: 'Smith', password: 'bobsmith', email: 'bobsmith@gmail.com'}),
        knex('users').insert({id: 3, firstname: 'Charlie', lastname: 'Smith', password: 'charliesmith', email: 'charliesmith@gmail.com'})
      ]);
    });
};
