exports.seed = function(knex, Promise) {
    return knex('authors').del()
    .then(function () {
      return Promise.all([
        knex('authors').insert({first_name: 'mike', last_name: 'monteiro'}),
        knex('authors').insert({first_name: 'jason', last_name: 'santa maria'}),
        knex('authors').insert({first_name: 'j.k.', last_name: 'rowling'})
      ]);
    });
};
