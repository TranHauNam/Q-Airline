import flightApi from './flight.api';

const flightService = {
  searchFlights: async (searchData) => {
    try {
      const searchParams = {
        origin: searchData.origin,
        destination: searchData.destination,
        departureTime: searchData.departureTime,
        returnTime: searchData.returnTime,
        flightType: searchData.flightType,
        classType: searchData.classType,
        adult: searchData.adult,
        children: searchData.children,
        infant: searchData.infant
      };

      console.log('Searching with params:', searchParams);
      
      return await flightApi.searchFlights(searchParams);
    } catch (error) {
      throw error;
    }
  },

  searchAirports: async () => {
    try {
      return await flightApi.searchAirports();
    } catch (error) {
      console.error('Error fetching airports:', error);
      throw error;
    }
  },

  formatPrice: (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  }
};

export default flightService; 