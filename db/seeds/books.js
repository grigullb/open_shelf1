exports.seed = function(knex, Promise) {
    // return knex('books').del()
    // .then(function () {
      return Promise.all([
        knex('books').insert({id: 1, title: 'Design is a Job', author_firstname: 'Mike', author_lastname: 'Monteiro', isbn: '9781937557041', user_id: 1}),
        knex('books').insert({id: 2, title: 'On Web Typography', author_firstname: 'Jason', author_lastname: 'Santa Maria', isbn: '9781937557065', user_id: 2}),
        knex('books').insert({id: 3, title: 'Harry Potter and the Goblet of Fire', author_firstname: 'Jason', author_lastname: 'Santa Maria', isbn: '1408855925', user_id: 2})
      ]);
    // });
};
