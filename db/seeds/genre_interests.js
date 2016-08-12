exports.seed = function(knex, Promise) {
    return knex('genre_interests').del()
    .then(function () {
      return Promise.all([
        knex('genre_interests').insert({genre_id: 1, user_id: 1}),
        knex('genre_interests').insert({genre_id:2, user_id: 1}),
        knex('genre_interests').insert({genre_id: 1, user_id: 2})
      ]);
    });
};
