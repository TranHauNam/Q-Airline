import flightApi from './flight.api';

const flightService = {
  searchFlights: async (searchParams) => {
    try {
      const apiParams = {
        origin: searchParams.departureAirport,
        destination: searchParams.arrivalAirport,
        departureTime: searchParams.departureDate,
        returnTime: searchParams.returnDate,
        flightType: searchParams.isRoundTrip ? 'round-trip' : 'one-way',
        classType: searchParams.seatClass || 'ECONOMY',
        adult: searchParams.adultCount || 1,
        children: searchParams.childCount || 0,
        infant: searchParams.infantCount || 0
      };
      
      console.log('Searching with params:', apiParams);
      const response = await flightApi.searchFlights(apiParams);
      return response;
    } catch (error) {
      console.error('Error searching flights:', error);
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