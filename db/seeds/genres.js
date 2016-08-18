exports.seed = function(knex, Promise) {
    return knex('genres').del()
    .then(function () {
      return Promise.all([
        knex('genres').insert({genre: 'Fiction'}),
        knex('genres').insert({genre: 'Application Software'}),
        knex('genres').insert({genre: 'Business & Economics'}),
        knex('genres').insert({genre: 'Juvenile Fiction'}),
        knex('genres').insert({genre: 'Psychology'})
      ]);
    });
};
