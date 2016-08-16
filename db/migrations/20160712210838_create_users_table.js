exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('firstname');
    table.string('lastname');
    table.string('email');
    table.string('password');
    table.boolean('isAdmin').defaultTo(false);
    table.timestamps();
  }).createTable('books', function(table) {
    table.increments('id').primary();
    table.string('title');
    table.string('isbn');
    table.integer('author_id').references('authors');
    table.integer('user_id').references('users');
    table.integer('genre_id').references('genres');
    table.string('condition');
    table.boolean('isSold').defaultTo(false);
    table.timestamps();
  }).createTable('messages', function(table){
    table.increments('id').primary();
    table.string('subject');
    table.boolean('read').defaultTo(false);
    table.string('text');
    table.integer('sender_id').references('users');
    table.integer('reciever_id').references('users');
    table.timestamps();
  }).createTable('authors', function(table){
    table.increments('id').primary();
    table.string('author');
    table.timestamps();
  }).createTable('genres', function(table){
    table.increments('id').primary();
    table.string('genre');
    table.timestamps();
  }).createTable('user_interests', function(table){
    table.increments('id').primary();
    table.string('type');
    table.string('interest');
    table.integer('user_id').references('users');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books')
    .dropTable('users')
    .dropTable('messages')
    .dropTable('authors')
    .dropTable('genres')
    .dropTable('user_interests');
};