const Plane = require('../../models/plane.model');

// [POST] /api/admin/plane/add
module.exports.addPlane = async (req, res) => {
    try {
        const {code, manufacturer} = req.body;
    
        if(!code || !manufacturer) {
            return res.status(400).json({
                message: 'Please provide all the required fields: code, manufacturer'
            });
        }
    
        const existPlane = await Plane.findOne({code: code});
    
        if(existPlane) {
            return res.status(400).json({
                message: 'Plane with the same code already exists'
            });
        }
    
        const newPlane = await Plane.create({
            code: code, 
            manufacturer: manufacturer
        });
    
        res.status(201).json({
            message: 'Plane added successfully',
            plane: newPlane
        });
    } catch (error) {
        console.error("Error adding plane", error);

        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

// [GET] /api/admin/plane/
module.exports.getAllPlanes = async (req, res) => {
    try {
        const planes = await Plane.find({});
        res.status(200).json({
            planes: planes
        });
    } catch (error) {
        console.error("Error getting all planes", error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}