const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: 'NEW_USER_PASSWORD',
  database: 'election'
});
module.exports = db;
