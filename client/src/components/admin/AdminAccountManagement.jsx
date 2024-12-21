import React, { useState, useEffect } from 'react';
import { adminApi } from '../../services/modules/admin/admin.api';
import { useNavigate } from 'react-router-dom';
import './Admin.css';
import Dialog from '../common/Dialog';

const AdminAccountManagement = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'admin' // Mặc định là admin
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const [dialog, setDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });

  useEffect(() => {
    const checkRole = async () => {
      try {
        const response = await adminApi.checkAuth();
        if (response.data.success) {
          if (response.data.admin.role !== 'superadmin') {
            navigate('/admin/home');
          }
          setUserRole(response.data.admin.role);
        }
      } catch (error) {
        navigate('/admin/home');
      }
    };
    checkRole();
  }, [navigate]);

  if (!userRole || userRole !== 'superadmin') {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setDialog({
        isOpen: true,
        title: 'Error',
        message: 'Confirmation password does not match',
        type: 'error'
      });
      return;
    }

    setLoading(true);
    try {
      const response = await adminApi.createAdmin(formData);
      setDialog({
        isOpen: true,
        title: 'Success',
        message: 'Admin account created successfully',
        type: 'success'
      });
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        role: 'admin'
      });
    } catch (error) {
      setDialog({
        isOpen: true,
        title: 'Error',
        message: error.response?.data?.message || 'An error occurred while creating an account.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className='h2-admin'>Create new Admin account</h2>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full name</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            required
            disabled={loading}
            placeholder="Enter your first and last name"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
            disabled={loading}
            placeholder="Nhập email"
          />
        </div>

        <div className="form-group">
          <label>Phone number</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            required
            disabled={loading}
            placeholder="Enter phone number"
          />
        </div>

        <div className="form-group">
          <label>Mật khẩu</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
            disabled={loading}
            placeholder="Enter password"
          />
        </div>

        <div className="form-group">
          <label>Xác nhận mật khẩu</label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            required
            disabled={loading}
            placeholder="Re-enter the password"
          />
        </div>

        <div className="form-group">
          <label>Role</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            disabled={loading}
          >
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create account'}
        </button>
      </form>

      <Dialog
        isOpen={dialog.isOpen}
        onClose={() => setDialog({ ...dialog, isOpen: false })}
        title={dialog.title}
        message={dialog.message}
        type={dialog.type}
      />
    </div>
  );
};

export default AdminAccountManagement; 