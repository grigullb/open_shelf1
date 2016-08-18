exports.seed = function(knex, Promise) {
    return knex('user_interests').del()
    .then(function () {
      return Promise.all([
        knex('user_interests').insert({type: 'title', interest: 'The Hobbit', user_id: 1}),
        knex('user_interests').insert({type: 'author', interest: 'Donald A. Norman', user_id: 2}),
        knex('user_interests').insert({type: 'author', interest: 'Donald A. Norman', user_id: 1}),
        knex('user_interests').insert({type: 'title', interest: 'The Hobbit', user_id: 2}),
        knex('user_interests').insert({type: 'genre', interest: 'Games', user_id: 2})
      ]);
    });
};
