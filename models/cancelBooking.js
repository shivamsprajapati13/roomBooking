const { connection } = require('../db/connection'); 

function deleteBooking(bookingId) {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM bookings WHERE id = ?';
    connection.query(sql, [bookingId], (err, results) => {
      if (err) return reject(err);
      resolve(results.affectedRows);
    });
  });
}

module.exports = { deleteBooking };