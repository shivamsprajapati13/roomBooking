const express = require('express');
const {bookRoom,getAllRoomBooking,getAvailableRooms } = require('../models/bookingsController');
const { getAllUsers } = require('../models/getAllUsers');
const { deleteBooking } = require('../models/cancelBooking');
const { cancelBooking } = require('../controllers/cancelController');

const router = express.Router();

router.post('/', bookRoom);
router.get('/bookings', getAllRoomBooking);
router.get('/rooms/available', getAvailableRooms);
router.get('/allUsers',getAllUsers)
router.delete('/cancelBooking',cancelBooking)
module.exports = router;
