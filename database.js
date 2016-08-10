require('dotenv').config();
const ENV          = process.env.ENV || "development";
const knexConfig   = require("./knexfile");
const knex         = require("knex")(knexConfig[ENV]);
const bookshelf    = require('bookshelf')(knex);
const bcrypt       = require('bcrypt-nodejs');

bookshelf.plugin('registry');

module.exports = bookshelf;