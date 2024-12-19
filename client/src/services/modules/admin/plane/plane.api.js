import axiosClient from '../../../axios.client';

export const planeApi = {
  addPlane: (data) => {
    return axiosClient.post('/admin/plane/add', data);
  },
  
  getAllPlanes: () => {
    return axiosClient.get('/admin/plane');
  }
}; 