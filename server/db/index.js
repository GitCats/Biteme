var knex = require('knex')({
  client: 'postgresql',
  connection: {
    host     : 'ec2-54-197-224-155.compute-1.amazonaws.com',
    user     : 'afoezekohcntbe',
    password : '7WY6zAYHlWlYWozkCrSnpqJa06',
    port: 5432,
    database : 'df5rer6m8ffk07',
    ssl: true
  }
});

module.exports = knex;
