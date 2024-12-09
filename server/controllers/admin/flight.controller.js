const Flight = require('../../models/flight.model');
const Plane = require('../../models/plane.model');

// [POST] /api/admin/flight/add
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

        res.status(200).json({
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


// [PATCH] /api/admin/flight/:id/departure-time
module.exports.changeDepartureTime = async (req, res) => {
    try {
        console.log(req.params);
        const flightNumber = req.params.flightNumber;      
        const newDepartureTime = req.body.newDepartureTime;
        
        if(!newDepartureTime) {
            return res.status(404).json({
                message: 'Please provide a new departure time.'
            })
        }

        await Flight.updateOne(
            { flightNumber: flightNumber },
            { $set: {departureTime: newDepartureTime} }
        );

        res.status(200).json({
            message: 'Departure time updated successfully.',
            departureTime: newDepartureTime
        });

    } catch (error) {
        console.log('Error changing departure time:', error);

        res.status(500).json({
            message: 'Failed to change departure time.',
            error: error.message
        });
    }   
};
