import axios from "axios";

// Tạo instance axios với cấu hình mặc định
const Client = axios.create({
  baseURL: "http://localhost:5000/api", // Chỉ để 1 /api
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
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
    }

    console.log('Request config:', config);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor cho responses
Client.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

export default Client;