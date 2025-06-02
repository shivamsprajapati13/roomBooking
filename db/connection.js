// db/connection.js
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'roombooking'
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to MySQL:', err.message);
  } else {
    console.log('✅ MySQL connection established');
  }
});

module.exports = { connection };
