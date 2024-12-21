import axios from "axios";

// Tạo instance axios với cấu hình mặc định
const Client = axios.create({
  baseURL: "http://localhost:5000/api", // Sửa port thành 5000 theo backend của bạn
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Cho phép gửi cookies
});

// Interceptor cho requests
Client.interceptors.request.use(
  async (config) => {
    // Lấy token từ localStorage
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Authorization Header:", config.headers.Authorization);
    } else {
      console.warn("No token provided");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor cho responses
Client.interceptors.response.use(
  (response) => {
    // Xử lý response thành công
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Xử lý các loại lỗi
    if (error.response) {
      // Lỗi từ server với status code
      switch (error.response.status) {
        case 401:
          // Xử lý lỗi unauthorized
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/sign';
          break;
        case 403:
          // Xử lý lỗi forbidden
          console.error('Access forbidden');
          break;
        case 404:
          // Xử lý lỗi not found
          console.error('Resource not found');
          break;
        default:
          // Xử lý các lỗi khác
          console.error('Server error:', error.response.data);
      }
    } else if (error.request) {
      // Lỗi không nhận được response
      console.error('Network error:', error.request);
    } else {
      // Lỗi trong quá trình setup request
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  }
);

// Các hàm helper để gọi API
export const apiHelper = {
  get: async (url, config = {}) => {
    try {
      return await Client.get(url, config);
    } catch (error) {
      throw error;
    }
  },

  post: async (url, data = {}, config = {}) => {
    try {
      return await Client.post(url, data, config);
    } catch (error) {
      throw error;
    }
  },

  put: async (url, data = {}, config = {}) => {
    try {
      return await Client.put(url, data, config);
    } catch (error) {
      throw error;
    }
  },

  delete: async (url, config = {}) => {
    try {
      return await Client.delete(url, config);
    } catch (error) {
      throw error;
    }
  }
};

export default Client;