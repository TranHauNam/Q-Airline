import Client from '../../client.api';

const flightApi = {
  // Tìm kiếm chuyến bay
  searchFlights: async (searchParams) => {
    try {
      console.log('Searching flights with params:', searchParams);
      const response = await Client.get('/api/flight/search', {
        origin: searchParams.origin,
        destination: searchParams.destination,
        departureTime: searchParams.departureTime,
        returnTime: searchParams.returnTime,
        flightType: searchParams.flightType || 'one-way',
        classType: searchParams.classType || 'Economy',
        adult: searchParams.adult || 1,
        children: searchParams.children || 0,
        infant: searchParams.infant || 0
      });
      return response.data.flights;
    } catch (error) {
      console.error('Error searching flights:', error);
      if (error.response?.status === 404) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  },

  // Lấy danh sách sân bay
  searchAirports: async () => {
    try {
      const response = await Client.get('/api/airports');
      return response.data;
    } catch (error) {
      console.error('Error fetching airports:', error);
      throw error;
    }
  }
};

export default flightApi; 