exports.seed = function(knex, Promise) {
    return knex('books').del()
    .then(function () {
      return Promise.all([
        knex('books').insert({title: 'content strategy for mobile', isbn: '9781937557041', user_id: 1, genre_id: 2, author_id: 1, condition: 'missing pages 100-200'}),
        knex('books').insert({title: 'on web typography', isbn: '9781937557065', user_id: 2, genre_id: 2, condition: 'Brand spanking new.', author_id: 2}),
        knex('books').insert({title: 'harry potter and the goblet of fire', isbn: '1408855925', user_id: 1, genre_id: 1, condition: 'Brand spanking old', author_id: 3}),
        knex('books').insert({title: 'harry potter and the order of the phoenix', isbn: ' 9780439358064', user_id: 1, genre_id: 1, condition: 'Brand spanking old', author_id: 3}),
        knex('books').insert({title: 'harry potter and the prisoner of azkaban', isbn: '0747546290', user_id: 1, genre_id: 1, condition: 'Brand spanking old', author_id: 3})
      ]);
    });
};
