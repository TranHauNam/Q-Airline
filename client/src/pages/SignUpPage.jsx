import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import accountService from '../services/modules/user/account';
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

    // Kiểm tra mật khẩu xác nhận
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      setLoading(false);
      return;
    }

    try {
      const response = await accountService.register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      });

      if (response.token) {
        // Đăng ký thành công và tự động đăng nhập
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
    } finally {
      setLoading(false);
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
              disabled={loading}
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
              minLength="6"
              disabled={loading}
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
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className={`signup-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Đang đăng ký...' : 'Đăng Ký'}
          </button>
        </form>

        <div className="signup-footer">
          <div className="social-signup">
            <p>Hoặc đăng ký với</p>
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

          <p className="login-text">
            Đã có tài khoản? 
            <span 
              onClick={() => navigate('/login')} 
              className="login-link"
            >
              Đăng nhập
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage; 