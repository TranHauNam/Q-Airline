const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const flightController = require('./controllers/client/flight.controller');

const app = express();

// Cấu hình CORS cho frontend port 3000
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware để parse JSON
app.use(express.json());

// Middleware để parse cookies
app.use(cookieParser());

// Flight routes
app.get('/api/flight/search', flightController.searchFlight);
app.get('/api/flight/all', flightController.getAllFlights);
app.get('/api/flight/single/:flightNumber', flightController.getSingleFlight);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app; 