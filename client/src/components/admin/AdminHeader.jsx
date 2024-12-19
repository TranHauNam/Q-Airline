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
    <div className="adm-header-wrapper">
      <div className="adm-header-container">
        <div className="adm-header-brand">
          <img src={logo} alt="Q-Airline Logo" />
          <div className="adm-header-brand-name">
            <span className="adm-header-brand-text">Q-AIRLINE</span>
            <span className="adm-header-brand-slogan">ADMINISTRATOR PANEL</span>
          </div>
        </div>

        <div className="adm-header-right">
          <div className={`adm-header-profile-wrapper ${showProfileMenu ? 'active' : ''}`}>
            <div 
              className="adm-header-profile-trigger"
              onClick={toggleMenu}
            >
              <div className="adm-header-profile-avatar">
                AD
              </div>
              <div className="adm-header-profile-icon">
                <i className="fas fa-chevron-down"></i>
              </div>
              <div className="adm-header-profile-status"></div>
            </div>
            
            {showProfileMenu && (
              <div className="adm-header-profile-menu">
                <div className="adm-header-profile-info">
                  <span className="adm-header-user-name">Administrator</span>
                  <span className="adm-header-user-email">admin@qairline.com</span>
                </div>
                <div className="adm-header-menu-items">
                  <button onClick={handleLogout} className="adm-header-menu-item logout">
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