import React, { useState, useEffect } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import accountService from '../../services/modules/user/account';
import './ProfilePage.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await accountService.getCurrentUser();
        setUser(userData);
        setFormData({
          ...formData,
          fullName: userData.fullName,
          email: userData.email,
          phone: userData.phone || ''
        });
      } catch (error) {
        setError('Không thể t��i thông tin người dùng');
      }
    };
    fetchUserData();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await accountService.updateProfile({
        fullName: formData.fullName,
        phone: formData.phone
      });
      setSuccess('Updated information successfully!');
      setIsEditing(false);
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while updating');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await accountService.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      setSuccess('Đổi mật khẩu thành công!');
      setIsChangingPassword(false);
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Có lỗi xảy ra khi đổi mật khẩu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="profile-page">
        <div className="profile-container">
          <h1>Personal information</h1>
          
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar2">
                {user?.fullName?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="profile-info2">
                <h2>{user?.fullName}</h2>
                <p>{user?.email}</p>
              </div>
            </div>

            <form onSubmit={handleUpdateProfile} className="profile-form">
              <div className="form-group">
                <label>Full name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  disabled={!isEditing || loading}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  disabled={true}
                />
              </div>

              <div className="form-group">
                <label>Số điện thoại</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  disabled={!isEditing || loading}
                />
              </div>

              {!isEditing ? (
                <button 
                  type="button" 
                  className="edit-button"
                  onClick={() => setIsEditing(true)}
                >
                  Edit information
                </button>
              ) : (
                <div className="button-group">
                  <button 
                    type="submit" 
                    className="save-button"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Saving changes'}
                  </button>
                  <button 
                    type="button" 
                    className="cancel-button"
                    onClick={() => setIsEditing(false)}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>

            <div className="password-section">
              <h3>Change password</h3>
              {!isChangingPassword ? (
                <button 
                  className="change-password-button"
                  onClick={() => setIsChangingPassword(true)}
                >
                  Change password
                </button>
              ) : (
                <form onSubmit={handleChangePassword} className="password-form">
                  <div className="form-group">
                    <label>Current password</label>
                    <input
                      type="password"
                      value={formData.currentPassword}
                      onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>New password</label>
                    <input
                      type="password"
                      value={formData.newPassword}
                      onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Confirm new password</label>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      required
                    />
                  </div>

                  <div className="button-group">
                    <button 
                      type="submit" 
                      className="save-button"
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Saving new password'}
                    </button>
                    <button 
                      type="button" 
                      className="cancel-button"
                      onClick={() => {
                        setIsChangingPassword(false);
                        setFormData({
                          ...formData,
                          currentPassword: '',
                          newPassword: '',
                          confirmPassword: ''
                        });
                      }}
                      disabled={loading}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
