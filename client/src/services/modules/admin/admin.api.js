import axiosClient from '../../axios.client';

export const adminApi = {
  login: (data) => {
    return axiosClient.post('/admin/account/login', data);
  },
  
  logout: () => {
    return axiosClient.post('/admin/account/logout');
  }
}; 