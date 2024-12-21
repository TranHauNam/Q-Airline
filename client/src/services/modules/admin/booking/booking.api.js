import axiosClient from '../../../axios.client';

export const bookingApi = {
  getAllBookings: () => {
    return axiosClient.get('/admin/booking');
  },
  
  getBookingStatistics: () => {
    return axiosClient.get('/admin/booking/statistics');
    
  }
}; 