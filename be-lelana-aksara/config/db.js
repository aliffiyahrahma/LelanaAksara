const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Sesuaikan dengan setting Laragon kamu
  database: 'lelana_aksara',
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;