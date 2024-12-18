import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Cấu hình axios cho backend port 5000
      axios.defaults.baseURL = 'http://localhost:5000';
      axios.defaults.withCredentials = true;

      const response = await axios.post('/api/user/login', formData);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        navigate('/');
      } else {
        setError('Đăng nhập không thành công');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        setError(error.response.data.message || 'Đăng nhập thất bại');
      } else if (error.request) {
        setError('Không thể kết nối đến server');
      } else {
        setError('Có lỗi xảy ra, vui lòng thử lại');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Đăng nhập</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Nhập email của bạn"
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Nhập mật khẩu"
            />
          </div>

          <button type="submit" className="login-button">
            Đăng nhập
          </button>
        </form>

        <div className="login-footer">
          <p>
            Chưa có tài khoản? 
            <span onClick={() => navigate('/sign')} className="register-link">
              Đăng ký ngay
            </span>
          </p>
          <a href="/forgot-password" className="forgot-password">
            Quên mật khẩu?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 