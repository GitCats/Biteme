var knex = require('knex')({
  client: 'postgresql',
  connection: {
    // database: 'test_for_blueplate'
    host: 'ec2-54-197-224-155.compute-1.amazonaws.com',
    user: 'eagqukcdyrkmat',
    password: 'zTD1WLZInN_gtjV4775AqCp20o',
    port: 5432,
    database: 'df5rer6m8ffk07',
    ssl: true
  },
  pool: {
    min: 2,
    max: 10
  }
});
console.log("Connected to Postgres");
module.exports = knex;
