import accountApi from './account.api';

const accountService = {
  // Đăng ký tài khoản
  register: async (userData) => {
    try {
      const response = await accountApi.register(userData);
      if (response.token) {
        accountApi.saveAuthData(response);
      }
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Đăng nhập
  login: async (credentials) => {
    try {
      const response = await accountApi.login(credentials);
      if (response.token) {
        accountApi.saveAuthData(response);
      }
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Đăng xuất
  logout: async () => {
    try {
      await accountApi.logout();
      accountApi.clearAuthData();
    } catch (error) {
      console.error('Logout error:', error);
      // Vẫn xóa dữ liệu local ngay cả khi API thất bại
      accountApi.clearAuthData();
    }
  },

  // Quên mật khẩu
  forgotPassword: async (email) => {
    try {
      const response = await accountApi.forgotPassword(email);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Xác thực OTP
  verifyOTP: async (data) => {
    try {
      const response = await accountApi.verifyOTP(data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Đặt lại mật khẩu
  resetPassword: async (newPassword) => {
    try {
      const response = await accountApi.resetPassword(newPassword);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Kiểm tra trạng thái đăng nhập
  checkAuthStatus: () => {
    return accountApi.isAuthenticated();
  },

  // Lấy thông tin người dùng hiện tại
  getCurrentUser: async () => {
    return await accountApi.getCurrentUser();
  }
};

export default accountService; 