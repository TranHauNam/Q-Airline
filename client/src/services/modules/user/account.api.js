import Client from '../../client.api';

const accountApi = {
  // Đăng ký tài khoản mới
  register: async (data) => {
    try {
      const response = await Client.post('/user/register', {
        fullName: data.fullName,
        email: data.email,
        password: data.password
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Đăng nhập
  login: async (data) => {
    try {
      const response = await Client.post('/user/login', {
        email: data.email,
        password: data.password
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Đăng xuất
  logout: async () => {
    try {
      const response = await Client.post('/user/logout');
      // Xóa token và thông tin user khỏi localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Quên mật khẩu - Gửi OTP
  forgotPassword: async (email) => {
    try {
      const response = await Client.post('/user/forgot-password', { email });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Xác thực mã OTP
  verifyOTP: async (data) => {
    try {
      const response = await Client.post('/user/otp-verification', {
        email: data.email,
        OTP: data.OTP
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Đặt lại mật khẩu mới
  resetPassword: async (newPassword) => {
    try {
      const response = await Client.post('/user/reset-password', {
        newPassword: newPassword
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Lấy thông tin người dùng hiện tại
  getCurrentUser: async () => {
    try {
      const user = localStorage.getItem('user');
      if (user) {
        return JSON.parse(user);
      }
      return null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  // Kiểm tra trạng thái đăng nhập
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },

  // Lưu thông tin đăng nhập
  saveAuthData: (data) => {
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    if (data.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
    }
  },

  // Xóa thông tin đăng nhập
  clearAuthData: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export default accountApi;
