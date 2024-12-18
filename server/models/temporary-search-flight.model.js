const mongoose = require('mongoose');

const temporarySearchSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    flightData: {
        type: Object, // Lưu toàn bộ thông tin chuyến bay đã tìm kiếm
        required: true
    },
    expiresAt: {
        type: Date,
        expires: 900,
        //index: { expires: 0 } // Tự động xóa sau khi hết hạn
    },
    adult: Number,
    children: Number,
    infant: Number
});

const TemporarySearch = mongoose.model('TemporarySearch', temporarySearchSchema, 'temporary-search-flight');

module.exports = TemporarySearch;
