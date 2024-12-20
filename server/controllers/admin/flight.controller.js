const Flight = require('../../models/flight.model');
const Plane = require('../../models/plane.model');

// [POST] /api/admin/flight/add
module.exports.addFlight = async (req, res) => {
    try {
        const { flightNumber, planeCode, origin, destination, departureTime, duration, priceEconomy, pricePremiumEconomy, priceBusiness, priceFirst} = req.body;

        const existFlight = await Flight.findOne({flightNumber: flightNumber});
        if(existFlight) {
            return res.status(400).json({ message: 'Mã chuyến bay đã tồn tại' });
        }

        const existPlane = await Plane.findOne({code: planeCode});
        if(!existPlane) {
            return res.status(400).json({ message: 'Không tìm thấy tàu bay' });
        }
        
        const seats = existPlane.seats.map(seat => ({
            ...seat,
            isBooked: false 
        }));

        const newFlight = await Flight.create({
            flightNumber: flightNumber,
            planeCode: planeCode,
            origin: origin,
            destination: destination,
            departureTime: departureTime,
            duration: duration,
            priceEconomy: priceEconomy,
            pricePremiumEconomy: pricePremiumEconomy,
            priceBusiness: priceBusiness,
            priceFirst: priceFirst,
            availableSeatsEconomy: existPlane.economySeats,
            availableSeatsPremiumEconomy: existPlane.premiumEconomySeats,
            availableSeatsBusiness: existPlane.businessSeats,
            availableSeatsFirst: existPlane.firstSeats,
            seats: seats
        });

        res.status(200).json({
            message: 'Thêm chuyến bay thành công',
            flight: newFlight
        });

    } catch (error) {
        console.log("Lỗi thêm chuyến bay", error);
        
        res.status(500).json({ 
            message: 'Lỗi thêm chuyến bay', 
            error: error.message 
        });
    }
};


// [PATCH] /api/admin/flight/:id/departure-time
module.exports.changeDepartureTime = async (req, res) => {
    try {
        // thêm lí do
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

module.exports.getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find({})
      .sort({ departureTime: 1 });
      
    res.status(200).json({
      success: true,
      flights: flights
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách chuyến bay",
      error: error.message
    });
  }
};

