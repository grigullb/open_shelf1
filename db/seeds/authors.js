exports.seed = function(knex, Promise) {
    return knex('authors').del()
    .then(function () {
      return Promise.all([
        knex('authors').insert({author: 'mike monteiro'}),
        knex('authors').insert({author: 'jason santa maria'}),
        knex('authors').insert({author: 'j.k. rowling'})
      ]);
    });
};
