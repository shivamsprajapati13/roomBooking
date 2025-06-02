const { connection } = require('../db/connection');

function getTeamSize(userId) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT COUNT(*) AS count
      FROM users
      WHERE teamId = (SELECT teamId FROM users WHERE id = ?)
    `;
    connection.query(sql, [userId], (err, results) => {
      if (err) return reject(err);
      resolve(results[0].count);
    });
  });
}

function getSharedDeskUsage(roomId, slot) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT COUNT(*) AS count
      FROM bookings
      WHERE roomId = ? AND slot = ? AND type = 'shared'
    `;
    connection.query(sql, [roomId, slot], (err, results) => {
      if (err) return reject(err);
      resolve(results[0].count);
    });
  });
}

function findAvailableRoom(type, slot, teamSize) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT r.id FROM rooms r
      WHERE r.type = ?
        AND NOT EXISTS (
          SELECT 1 FROM bookings b
          WHERE b.roomId = r.id AND b.slot = ?
          ${type === 'shared' ? '' : 'LIMIT 1'}
        )
      ORDER BY r.id
      LIMIT 1
    `;
    connection.query(sql, [type, slot], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]); // first available room
    });
  });
}

function createBooking({ userId, teamId = null, slot, type, roomId }) {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO bookings (userId, teamId, slot, type, roomId)
      VALUES (?, ?, ?, ?, ?)
    `;
    connection.query(sql, [userId, teamId, slot, type, roomId], (err, results) => {
      if (err) return reject(err);
      resolve(results.insertId); // booking ID
    });
  });
}

module.exports = {
  createBooking,
  getTeamSize,
  getSharedDeskUsage,
  findAvailableRoom
};
