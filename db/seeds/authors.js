exports.seed = function(knex, Promise) {
    return knex('authors').del()
    .then(function () {
      return Promise.all([
        knex('authors').insert({first_name: 'Mike', last_name: 'Monteiro'}),
        knex('authors').insert({first_name: 'Jason', last_name: 'Santa Maria'}),
        knex('authors').insert({first_name: 'J.K.', last_name: 'Rowling'})
      ]);
    });
};
