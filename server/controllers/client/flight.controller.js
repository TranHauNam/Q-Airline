const Flight = require('../../models/flight.model');

module.exports.getAllFlights = async (req, res) => {
    try {
        const { flightNumber, origin, destination, minPrice, maxPrice, startTime, endTime } = req.query;

        const filter = {};

        if (flightNumber) {
            filter.flightNumber = { $regex: flightNumber, $options: 'i' };
        }

        if (origin) {
            filter.origin = { $regex: origin, $options: 'i' };
        }

        if (destination) {
            filter.destination = { $regex: destination, $options: 'i' };
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = parseFloat(minPrice);
            if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
        }

        if (startTime || endTime) {
            filter.departureTime = {};
            if (startTime) filter.departureTime.$gte = new Date(startTime);
            if (endTime) filter.departureTime.$lte = new Date(endTime);
        }

        console.log(filter);
        
        const flights = await Flight.find(filter).populate('planeId');
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
};

module.exports.getSingleFlight = async (req, res) => {
    try {
        const flightNumber = req.params.flightNumber;

        const flight = await Flight.findOne({ flightNumber: flightNumber }).populate('planeId');

        if(!flight) {
            return res.status(404).json({ message: 'Flight not found.' });
        }

        res.status(200).json({
            flightNumber: flight.flightNumber, 
            planeId: flight.planeId, 
            origin: flight.origin, 
            destination: flight.destination, 
            departureTime: flight.departureTime, 
            arrivalTime: flight.arrivalTime, 
            price: flight.price, 
            createAt: flight.createAt
        });
    } catch (error) {
        console.error("Error getting flight by number", error);

        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

module.exports.searchFlight = async (req, res) => {
    try {
        const {origin, destination, departureTime} = req.query; 

        const filter = {};

        if (origin) {
            filter.origin = {$regex: origin, $options: 'i'};
        }

        if (destination) {
            filter.destination = {$regex: destination, $options: 'i'};
        }

        if (departureTime) {
            const parsedDepartureTime = new Date(departureTime);
            const startOfDay = new Date(parsedDepartureTime.setHours(0, 0, 0, 0));
            const endOfDay = new Date(parsedDepartureTime.setHours(23, 59, 59, 999));
            filter.departureTime = {$gte: startOfDay, $lte: endOfDay};
        }

        const flights = await Flight.find(filter);

        res.status(200).json({
            flights: flights
        });
    } catch (error) {
        console.error("Error searching flight", error);

        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};