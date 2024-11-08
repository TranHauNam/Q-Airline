//Khởi tạo mongoose
const mongoose = require('mongoose');

module.exports.connect = async () => {
    try {
        //Kết nối đến MongoDB
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected successfully');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
}