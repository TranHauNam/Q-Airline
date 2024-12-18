import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUpPage.css';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    // Kiểm tra mật khẩu xác nhận
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    try {
      axios.defaults.baseURL = 'http://localhost:5000';
      axios.defaults.withCredentials = true;

      const response = await axios.post('/api/user/register', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        navigate('/');
      } else {
        setError('Đăng ký không thành công');
      }
    } catch (error) {
      console.error('Register error:', error);
      if (error.response) {
        setError(error.response.data.message || 'Đăng ký thất bại');
      } else if (error.request) {
        setError('Không thể kết nối đến server');
      } else {
        setError('Có lỗi xảy ra, vui lòng thử lại');
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Đăng Ký Tài Khoản</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Họ và tên</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Nhập họ và tên của bạn"
            />
          </div>

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
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label>Xác nhận mật khẩu</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Nhập lại mật khẩu"
              minLength="6"
            />
          </div>

          <button type="submit" className="signup-button">
            Đăng Ký
          </button>
        </form>

        <div className="signup-footer">
          <p>
            Đã có tài khoản? 
            <span onClick={() => navigate('/login')} className="login-link">
              Đăng nhập
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage; 