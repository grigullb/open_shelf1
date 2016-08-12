exports.seed = function(knex, Promise) {
    return knex('genres').del()
    .then(function () {
      return Promise.all([
        knex('genres').insert({genre: 'fiction'}),
        knex('genres').insert({genre: 'application software'})
      ]);
    });
};
