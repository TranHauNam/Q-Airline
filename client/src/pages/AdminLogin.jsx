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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await adminApi.login(formData);
      console.log('Login response:', response.data);
      
      // 
      if (response.data.adminToken) {
        const Cookies = require('js-cookie');
        Cookies.set('adminToken', response.data.adminToken, { 
          expires: 1,
          path: '/',
          sameSite: 'Lax'
        });
        
        console.log('Cookie after set:', document.cookie);
        navigate('/admin/home', { replace: true });
        console.log('Navigating to /admin/home');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adm-login-wrap">
      <div>
        <div className="adm-login-container">
          <div className="adm-login-form-container adm-login-sign-in-container">
            <form className="adm-login-form" onSubmit={handleSubmit}>
              <h1 className="adm-login-h11">Đăng nhập bằng tài khoản Admin</h1>

              <span></span>
              
              {error && <div className="error-message">{error}</div>}
              
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                disabled={loading}
              />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                disabled={loading}
              />
              
              <button 
                className="adm-login-btn"
                disabled={loading}
              >
                {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </button>
            </form>
          </div>
          
          <div className="adm-login-overlay-container">
            <div className="adm-login-overlay">
              <div className="adm-login-overlay-panel adm-login-overlay-right">
                <h1 className="adm-login-h1">Xin chào Admin!</h1>
                <p className="adm-login-p">
                  Đăng nhập để quản lý hệ thống
                  <p className="adm-login-p">
                    Q-Airline
                  </p>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin; 