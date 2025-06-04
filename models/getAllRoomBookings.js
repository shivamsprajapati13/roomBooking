
async function getAllRoomBooking(req, res) {
  try {
    const sql = `
      SELECT 
        b.id AS bookingId,
        b.slot,
        b.type AS roomType,
        r.id AS roomId,
        r.type AS roomCategory,
        u.id AS userId,
        u.name AS userName,
        u.age,
        t.name AS teamName
      FROM bookings b
      JOIN rooms r ON b.roomId = r.id
      JOIN users u ON b.userId = u.id
      LEFT JOIN teams t ON u.teamId = t.id
      ORDER BY b.slot, r.id
    `;

    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching bookings:', err);
        return res.status(500).json({ error: 'Failed to fetch room bookings' });
      }
      return res.json(results);
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { getAllRoomBooking };
