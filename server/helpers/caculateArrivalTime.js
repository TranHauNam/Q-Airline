module.exports = (departureTime, duration) => {
    // Chuyển departureTime thành đối tượng Date
    const departureDate = new Date(departureTime);

    // Khởi tạo các giá trị giờ và phút
    let hours = 0;
    let minutes = 0;

    // Sử dụng regex để trích xuất giá trị giờ và phút từ duration
    const hoursMatch = duration.match(/(\d+)h/); // Tìm số giờ
    const minutesMatch = duration.match(/(\d+)m/); // Tìm số phút

    // Nếu tìm thấy số giờ, gán vào biến hours
    if (hoursMatch) {
        hours = parseInt(hoursMatch[1], 10);
    }

    // Nếu tìm thấy số phút, gán vào biến minutes
    if (minutesMatch) {
        minutes = parseInt(minutesMatch[1], 10);
    }

    // Cộng giờ và phút vào thời gian khởi hành
    const arrivalTime = new Date(departureDate.getTime()); // Sao chép đối tượng Date
    arrivalTime.setUTCHours(arrivalTime.getUTCHours() + hours);
    arrivalTime.setUTCMinutes(arrivalTime.getUTCMinutes() + minutes);

    return arrivalTime.toISOString(); // Trả về dưới dạng chuỗi ISO
}
