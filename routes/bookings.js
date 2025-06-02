const express = require('express');
const { bookRoom,getAllRoomBooking,getAvailableRooms } = require('../controllers/bookingsController');

const router = express.Router();

router.post('/', bookRoom);
router.get('/bookings', getAllRoomBooking);
router.get('/rooms/available', getAvailableRooms);
module.exports = router;
