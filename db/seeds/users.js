exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, firstname: 'Alice', lastname: 'Smith', email: 'alicesmith@gmail.com', isAdmin: true}),
        knex('users').insert({id: 2, firstname: 'Bob', lastname: 'Smith', email: 'bobsmith@gmail.com'}),
        knex('users').insert({id: 3, firstname: 'Charlie', lastname: 'Smith', email: 'charliesmith@gmail.com'})
      ]);
    });
    return knex('books').del()
    .then(function () {
      return Promise.all([
        knex('books').insert({id: 1, title: 'Design is a Job', author_firstname: 'Mike', author_lastname: 'Monteiro', isbn: '9781937557041', user_id: 1}),
        knex('books').insert({id: 1, title: 'On Web Typography', author_firstname: 'Jason', author_lastname: 'Santa Maria', isbn: '9781937557065', user_id: 2})
      ]);
    });
};
