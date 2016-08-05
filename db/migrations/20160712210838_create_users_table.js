exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('firstname');
    table.string('lastname');
    table.string('email');
    table.boolean('isAdmin').defaultTo(false);
    table.timestamps();
  }).createTable('books', function(table) {
    table.increments('id').primary();
    table.string('title');
    table.string('isbn');
    table.string('author_firstname');
    table.string('author_lastname');
    table.integer('user_id').references('users');
    table.timestamps();
  }).createTable('messages', function(table){
    table.increments('id').primary();
    table.string('text');
    table.integer('sender_id').references('users');
    table.integer('reciever_id').references('users');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books')
    .dropTable('users')
    .dropTable('books')
    .dropTable('messages');
};