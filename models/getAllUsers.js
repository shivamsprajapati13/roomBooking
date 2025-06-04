const { connection } = require('../db/connection');

function getAllUsers(req,res) {
  const sql = 'SELECT * FROM users';
  connection.query(sql, (err, results) => {
    if (err) {
      return res.json(err);
    }
    res.json(results);
  });
}

module.exports = { getAllUsers };
