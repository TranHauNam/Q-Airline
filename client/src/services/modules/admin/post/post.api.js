import axiosClient from '../../../axios.client';

export const postApi = {
  createPost: (data) => {
    return axiosClient.post('/admin/post', data);
  }
}; 