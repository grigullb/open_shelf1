exports.seed = function(knex, Promise) {
    return knex('authors').del()
    .then(function () {
      return Promise.all([
        knex('authors').insert({author: 'Mike Monteiro'}),
        knex('authors').insert({author: 'Alison Moore'}),
        knex('authors').insert({author: 'J.K. Rowling'}),
        knex('authors').insert({author: 'Malcolm Gladwell'}),
        knex('authors').insert({author: 'J.R.R. Tolkien'}),
        knex('authors').insert({author: 'Donald A. Norman'}),
        knex('authors').insert({author: 'Joseph Conrad'}),
        knex('authors').insert({author: 'E. L. James'})
      ]);
    });
};
