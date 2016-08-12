exports.seed = function(knex, Promise) {
    return knex('author_interests').del()
    .then(function () {
      return Promise.all([
        knex('author_interests').insert({author_id: 3, user_id: 1}),
        knex('author_interests').insert({author_id:2, user_id: 1}),
        knex('author_interests').insert({author_id: 1, user_id: 3})
      ]);
    });
};
