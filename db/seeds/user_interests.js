exports.seed = function(knex, Promise) {
    return knex('user_interests').del()
    .then(function () {
      return Promise.all([
        knex('user_interests').insert({type: 'author', interest: 'jk rowling', user_id: 1}),
        knex('user_interests').insert({type: 'genre', interest: 'fiction', user_id: 2}),
        knex('user_interests').insert({type: 'title', interest: 'harry potter and the goblet of fire', user_id: 3})
      ]);
    });
};
