const API_BASE_URL = 'localhost:5000';

export const flightService = {
  searchFlights: async (params) => {
    // Logic tìm kiếm chuyến bay
  },
  
  bookFlight: async (bookingData) => {
    // Logic đặt vé
  },
  
  cancelBooking: async (bookingId) => {
    // Logic hủy vé
  },
  
  // Các API khác
};

export const adminService = {
  manageFlight: async (flightData) => {
    // Logic quản lý chuyến bay
  },
  
  manageNews: async (newsData) => {
    // Logic quản lý tin tức
  },
  
  // Các API quản trị khác
}; 