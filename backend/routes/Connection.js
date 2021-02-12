const { Pool, Client } = require('pg');
const pool = new Pool()
const config = {
  user: 'postgres',
  host: 'localhost',
  database: 'WomenSafety',
  password: 'muskan1234',
  port: 5432,
}

module.exports =config;
