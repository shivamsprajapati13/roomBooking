const { deleteBooking } = require("../models/cancelBooking");

  async function cancelBooking(req,res){
        const { id } = req.body;
 try {
    const affected = await deleteBooking(id);
    console.log(req.id);
    if (affected === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
}

module.exports = { cancelBooking };
