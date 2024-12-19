import axiosClient from '../../../axios.client';

export const flightApi = {
  addFlight: (data) => {
    return axiosClient.post('/admin/flight/add', data);
  },
  
  changeDepartureTime: (flightNumber, data) => {
    return axiosClient.patch(`/admin/flight/${flightNumber}/departure-time`, data);
  }
}; 