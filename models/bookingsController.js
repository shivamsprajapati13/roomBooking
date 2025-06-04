const { createBooking, findAvailableRoom, getTeamSize, getSharedDeskUsage } = require('./bookingModel');
const { connection } = require('../db/connection'); 

async function bookRoom(req, res) {
  const { userId, slot, type } = req.body;

  if (!slot || !type || !userId) {
    return res.status(400).json({ error: 'Missing booking parameters' });
  }

  try {
    let teamId = null;
    let teamSize = 1;

   
    if (type === 'conference') {
      teamSize = await getTeamSize(userId);
      if (teamSize < 3) {
        return res.status(400).json({ error: 'Conference rooms require a team of at least 3' });
      }
    }

    const room = await findAvailableRoom(type, slot, teamSize);
    if (!room) {
      return res.status(400).json({ error: 'No available room for the selected slot and type.' });
    }
 if (type === 'shared') {
      const currentUsers = await getSharedDeskUsage(room.id, slot);
      if (currentUsers >= 4) {
        return res.status(400).json({ error: 'No available room for the selected slot and type.' });
      }
    }

    const bookingId = await createBooking({
      userId,
      teamId,
      slot,
      type,
      roomId: room.id
    });

    return res.json({ message: 'Room booked successfully', bookingId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Booking failed' });
  }
}




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


async function getAvailableRooms(req, res) {
  const { slot } = req.query;

  if (!slot) {
    return res.status(400).json({ error: 'Slot is required' });
  }

  try {
    const sql = `
      SELECT *
      FROM rooms
      WHERE id NOT IN (
        SELECT roomId FROM bookings WHERE slot = ?
      )
    `;

    connection.query(sql, [slot], (err, results) => {
      if (err) {
        console.error('Error fetching available rooms:', err);
        return res.status(500).json({ error: 'Failed to fetch available rooms' });
      }

      res.json({ availableRooms: results });
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { bookRoom,getAllRoomBooking,getAvailableRooms };
