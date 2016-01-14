var knex = require('knex')({
  client: 'postgresql',
  connection: {
    host     : '127.0.0.1',
    user     : 'kaylamatteo',
    password : '',
    database : 'blueplate'
  }
});

// var knex = require('knex')({
//   client: 'postgresql',
//   connection: {
//     filename: "../schema.sql"
//   }
// });

// module.exports = knex;