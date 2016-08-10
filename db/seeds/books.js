exports.seed = function(knex, Promise) {
    return knex('books').del()
    .then(function () {
      return Promise.all([
        knex('books').insert({title: 'Content strategy for mobile', isbn: '9781937557041', user_id: 1, genre_id: 2, author_id: 1, condition: 'not book'}),
        knex('books').insert({title: 'On Web Typography', isbn: '9781937557065', user_id: 2, genre_id: 2, condition: 'not', author_id: 2}),
        knex('books').insert({title: 'Harry Potter and the Goblet of Fire', isbn: '1408855925', user_id: 1, genre_id: 1, condition: 'not good', author_id: 3})
      ]);
    });
};
