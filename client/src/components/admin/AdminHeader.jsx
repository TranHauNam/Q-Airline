import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminHeader.css';
import logo from '../../assets/logo192.png';

const AdminHeader = ({ onLogout }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="admin-header-wrapper">
      <div className="admin-header">
        <div className="admin-header-brand">
          <img src={logo} alt="Q-Airline Logo" />
          <div className="brand-name">
            <span className="brand-text">Q-AIRLINE</span>
            <span className="brand-slogan">ADMINISTRATOR PANEL</span>
          </div>
        </div>

        <div className="admin-header-right">
          <div className={`profile-wrapper ${showProfileMenu ? 'active' : ''}`}>
            <div 
              className="profile-trigger"
              onClick={toggleMenu}
            >
              <div className="profile-avatar">
                AD
              </div>
              <div className="profile-icon">
                <i className="fas fa-chevron-down"></i>
              </div>
              <div className="profile-status"></div>
            </div>
            
            {showProfileMenu && (
              <div className="profile-menu">
                <div className="profile-info">
                  <span className="user-name">Administrator</span>
                  <span className="user-email">admin@qairline.com</span>
                </div>
                <div className="menu-items">
                  <button onClick={handleLogout} className="menu-item logout">
                    <i className="fas fa-sign-out-alt"></i>
                    Đăng xuất
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader; 