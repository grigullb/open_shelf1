exports.seed = function(knex, Promise) {
    return knex('books').del()
    .then(function () {
      return Promise.all([
        knex('books').insert({title: 'Blink: The Power of Thinking Without Thinking', isbn: '0316005045', user_id: 1, genre_id: 3, author_id: 4, condition: 'missing pages 100-200'}),
        knex('books').insert({title: 'The Tipping Point: How Little Things Can Make a Big Difference', isbn: '0759574731', user_id: 1, genre_id: 3, author_id: 4, condition: 'Weathered'}),
        knex('books').insert({title: "Harry Potter and the Sorcerer's Stone", isbn: "0613959922", user_id: 2, genre_id: 4,author_id: 3, condition: 'Brand new' }),
        knex('books').insert({title: "Harry Potter and the Goblet of Fire", isbn: "0439139597", user_id: 2, genre_id: 4,author_id: 3, condition: 'Brand new' }),
        knex('books').insert({title: "Harry Potter and the Order of the Phoenix", isbn: "043935806X", user_id: 2, genre_id: 4,author_id: 3, condition: 'Brand new' }),
        knex('books').insert({title: "The Lighthouse", isbn: "0143187910", user_id: 2, genre_id: 1,author_id: 2, condition: 'Brand new' }),
        knex('books').insert({title: "The Hobbit", isbn: "0547951973", user_id: 1, genre_id: 4,author_id: 5, condition: 'Brand new' }),
        knex('books').insert({title: "The Hobbit", isbn: "0547951973", user_id: 2, genre_id: 4,author_id: 5, condition: 'Brand new' }),
        knex('books').insert({title: "The Design of Everyday Things", isbn: "9780465050659", user_id: 1, genre_id: 3,author_id: 6, condition: 'Slightly worn out' }),
        knex('books').insert({title: "", isbn: "", user_id: , genre_id: ,author_id: , condition: 'Brand new' }),
        knex('books').insert({title: "", isbn: "", user_id: , genre_id: ,author_id: , condition: 'Brand new' })
      ]);
    });
};


//knex('books').insert({title: "", isbn: "", user_id: , genre_id: ,author_id: , condition: 'Brand new' }),