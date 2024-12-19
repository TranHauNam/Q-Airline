import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import accountService from '../services/modules/user/account';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await accountService.login(formData);
      
      if (response.token) {
        // Đăng nhập thành công
        window.location.href = '/';
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
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
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
              disabled={loading}
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
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className={`login-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <div className="login-footer">
          <div className="remember-forgot">
            <label className="remember-me">
              <input type="checkbox" /> Ghi nhớ đăng nhập
            </label>
            <span 
              className="forgot-password"
              onClick={handleForgotPassword}
            >
              Quên mật khẩu?
            </span>
          </div>

          <div className="social-login">
            <p>Hoặc đăng nhập với</p>
            <div className="social-buttons">
              <button className="social-button google">
                <i className="fab fa-google"></i>
                Google
              </button>
              <button className="social-button facebook">
                <i className="fab fa-facebook-f"></i>
                Facebook
              </button>
            </div>
          </div>

          <p className="signup-text">
            Chưa có tài khoản? 
            <span 
              onClick={() => navigate('/signup')} 
              className="register-link"
            >
              Đăng ký ngay
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 