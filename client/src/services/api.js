import { apiHelper } from './client.api';

export const authAPI = {
  login: (data) => {
    return apiHelper.post('/user/login', data);
  },
  
  register: (data) => {
    return apiHelper.post('/user/register', data);
  },
  
  logout: () => {
    return apiHelper.post('/user/logout');
  },

  forgotPassword: (email) => {
    return apiHelper.post('/user/forgot-password', { email });
  },

  resetPassword: (data) => {
    return apiHelper.post('/user/reset-password', data);
  }
};

export const userAPI = {
  getProfile: () => {
    return apiHelper.get('/user/profile');
  },
  
  updateProfile: (data) => {
    return apiHelper.put('/user/profile', data);
  }
};

// Thêm các API khác khi cần 