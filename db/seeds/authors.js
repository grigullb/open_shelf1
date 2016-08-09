exports.seed = function(knex, Promise) {
    return knex('authors').del()
    .then(function () {
      return Promise.all([
        knex('authors').insert({id: 1, first_name: 'Mike', last_name: 'Monteiro'}),
        knex('authors').insert({id: 2, first_name: 'Jason', last_name: 'Santa Maria'}),
        knex('authors').insert({id: 3, first_name: 'J.K.', last_name: 'Rowling'})
      ]);
    });
};
