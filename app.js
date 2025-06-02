const express = require('express');
const bookingRoutes = require('./routes/bookings');

const app = express();
app.use(express.json());

app.use('/api/v1/bookings', bookingRoutes);



app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
