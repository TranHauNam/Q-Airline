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
      
      if (response.data.adminToken) {
        const Cookies = require('js-cookie');
        Cookies.set('adminToken', response.data.adminToken, { 
          expires: 1,
          path: '/',
          sameSite: 'Lax'
        });
        
        console.log('Cookie after set:', document.cookie);
        navigate('/admin/home', { replace: true });
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Đăng nhập thất b��i');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sp-wrap">
      <div>
        <div className="sp-container">
          <div className="sp-form-container sp-sign-in-container">
            <form className="sp-form" onSubmit={handleSubmit}>
              <h1 className="sp-h11">Đăng nhập bằng tài khoản Admin</h1>

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
                className="sp-sign-btn"
                disabled={loading}
              >
                {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </button>
            </form>
          </div>
          
          <div className="sp-overlay-container">
            <div className="sp-overlay">
              <div className="sp-overlay-panel sp-overlay-right">
                <h1 className="sp-h1">Xin chào Admin!</h1>
                <p className="sp-p">
                  Đăng nhập để quản lý hệ thống
                  <p className="sp-p">
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