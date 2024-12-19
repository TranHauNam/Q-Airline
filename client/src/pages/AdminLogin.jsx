import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../services/modules/admin/admin.api';
import './AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await adminApi.login(formData);
      console.log('Login response:', response.data);
      
      if (response.data.adminToken) {
        const Cookies = require('js-cookie');
        Cookies.set('adminToken', response.data.adminToken, { 
          expires: 1, // 1 day
          path: '/',
          sameSite: 'Lax'
        });
        
        console.log('Cookie after set:', document.cookie);
        navigate('/adminxinso', { replace: true });
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Đăng nhập thất bại');
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-header">
          <h1>Admin Login</h1>
          <p>Đăng nhập để quản lý hệ thống</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin; 