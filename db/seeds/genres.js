exports.seed = function(knex, Promise) {
    return knex('genres').del()
    .then(function () {
      return Promise.all([
        knex('genres').insert({genre: 'fiction'}),
        knex('genres').insert({genre: 'application software'}),
        knex('genres').insert({genre: 'Business & Economics'}),
        knex('genres').insert({genre: 'Juvenile Fiction'})
      ]);
    });
};
