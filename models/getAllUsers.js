// models/userModel.js
const { connection } = require('../db/connection');

// Example: Get all users
function getAllUsers(callback) {
  const sql = 'SELECT * FROM users';
  connection.query(sql, (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
}

module.exports = { getAllUsers };
