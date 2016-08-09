exports.seed = function(knex, Promise) {
    return knex('genres').del()
    .then(function () {
      return Promise.all([
        knex('genres').insert({id: 1, genre: 'Fiction'}),
        knex('genres').insert({id: 2, genre: 'Application software'})
      ]);
    });
};
