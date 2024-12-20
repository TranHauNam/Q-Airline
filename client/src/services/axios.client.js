import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // Cho phép gửi cookie trong các request
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Thêm token vào header nếu có
    const adminToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('adminToken='))
      ?.split('=')[1];
      
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // Xử lý lỗi authentication
    if (error.response?.status === 401) {
      // window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default axiosClient; 