const Flight = require('../../models/admin/flight.model');
const Plane = require('../../models/admin/plane.model');

module.exports.addFlight = async (req, res) => {
    try {
        const { flightNumber, planeId, origin, destination, departureTime, arrivalTime, price } = req.body;

        if(!flightNumber || !planeId || !origin || !destination || !departureTime || !arrivalTime || !price) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const existFlight = await Flight.findOne({flightNumber: flightNumber});
        if(existFlight) {
            return res.status(400).json({ message: 'Flight number already exists.' });
        }

        const existPlane = await Plane.findById(planeId);
        if(!existPlane) {
            return res.status(400).json({ message: 'Plane not found.' });
        }

        const newFlight = await Flight.create({
            flightNumber: flightNumber,
            planeId: planeId,
            origin: origin,
            destination: destination,
            departureTime: departureTime,
            arrivalTime: arrivalTime,
            price: price
        });

        res.status(201).json({
            message: 'Flight added successfully.',
            flight: newFlight
        });

    } catch (error) {
        console.log("Error adding flight", error);
        
        res.status(500).json({ 
            message: 'Error adding flight.', 
            error: error.message 
        });
    }
};

module.exports.getAllFlights = async (req, res) => {
    try {
        const flights = await Plane.find({});
        res.status(200).json({
            flights: flights
        });
    } catch (error) {
        console.error("Error getting all flights", error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

module.exports.changeFlight = (req, res) => {

};

module.exports.deleteFlight = (req, res) => {

};