const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const flightRoutes = require('./routes/client/flight.route');
const adminRoutes = require('./routes/admin/admin.route');

// Cấu hình CORS cho frontend port 3000
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  exposedHeaders: ['set-cookie']
}));

// Middleware để parse JSON
app.use(express.json());

// Middleware để parse cookies
app.use(cookieParser());

app.use('/api/flight', flightRoutes);
app.use('/api/admin', adminRoutes);

// Các routes và middleware khác...

module.exports = app; 