const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const flightRoutes = require('./routes/client/flight.route');


// Cấu hình CORS cho frontend port 3000
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,

  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],

  exposedHeaders: ['set-cookie']

}));

// Middleware để parse JSON
app.use(express.json());

// Middleware để parse cookies
app.use(cookieParser());

// Các routes và middleware khác...

module.exports = app; 