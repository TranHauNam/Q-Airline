// Hàm tạo mã đặt vé với format: 2 chữ + 4 số
module.exports = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let bookingCode = '';
    
    // Tạo 2 ký tự chữ đầu tiên
    for (let i = 0; i < 2; i++) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        bookingCode += letters[randomIndex];
    }
    
    // Tạo 4 ký tự số cuối
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        bookingCode += numbers[randomIndex];
    }
    
    return bookingCode;
};