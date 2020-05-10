var knex = require('knex')({
  client: 'postgresql',
  connection: {
    // database: 'test_for_blueplate'
    host: 'ec2-174-129-255-7.compute-1.amazonaws.com',
    user: 'lhemxbjlbqrppx',
    password: '0cdfd6702e1335dfcc8cfd83579406aba7c13297028d1d2b779ced39bd8f985e',
    port: 5432,
    database: 'd5f8gbv9n20htr',
    ssl: true
  },
  pool: {
    min: 2,
    max: 10
  }
});
console.log("Connected to Postgres");
module.exports = knex;
