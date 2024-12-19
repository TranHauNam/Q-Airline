import Client from '../../client.api';

const flightApi = {
  searchFlights: async (searchParams) => {
    try {
      console.log('Original searchParams:', searchParams);

      // Validate dữ liệu trước khi gửi
      if (!searchParams.origin || !searchParams.destination || 
          !searchParams.departureTime || !searchParams.flightType || 
          !searchParams.classType) {
        throw new Error('Thiếu thông tin tìm kiếm');
      }

      // Đảm bảo dữ liệu được gửi đúng format
      const requestBody = {
        origin: searchParams.origin,
        destination: searchParams.destination,
        departureTime: searchParams.departureTime,
        returnTime: searchParams.returnTime,
        flightType: searchParams.flightType,
        classType: searchParams.classType,
        adult: Number(searchParams.adult),
        children: Number(searchParams.children),
        infant: Number(searchParams.infant)
      };

      console.log('Request body:', requestBody);

      const response = await Client.post('/flight/search', requestBody);
      
      console.log('Response:', response);

      if (!response || !response.data) {
        throw new Error('Không nhận được dữ liệu từ server');
      }

      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        if (error.response.status === 404) {
          throw new Error('Không tìm thấy chuyến bay phù hợp');
        }
        throw new Error(error.response.data.message || 'Lỗi server');
      } else if (error.request) {
        throw new Error('Không thể kết nối đến server');
      } else {
        throw new Error(error.message || 'Có lỗi xảy ra khi tìm kiếm');
      }
    }
  }
};

export default flightApi; 