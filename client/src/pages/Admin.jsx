import React, { useState, useEffect } from 'react';
import { FaNewspaper, FaPlane, FaRoute, FaTicketAlt, FaClock, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../services/modules/admin/admin.api';
import './Admin.css';
import welcomeImage from '../assets/images/admin-welcome.jpg';
import logo from '../assets/logo192.png';

// Import components
import NewsManagement from '../components/admin/NewsManagement';
import AircraftManagement from '../components/admin/AircraftManagement';
import FlightManagement from '../components/admin/FlightManagement';
import BookingStatistics from '../components/admin/BookingStatistics';
import DelayManagement from '../components/admin/DelayManagement';
import AdminAccountManagement from '../components/admin/AdminAccountManagement';

const Admin = () => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await adminApi.checkAuth();
        if (response.data.success) {
          // Check admin role
          setIsAuthenticated(true);
          setUserRole(response.data.admin.role);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        // navigate('/admin/login');
      }
    };
    checkAuth();
  }, [navigate]);

  const adminModules = [
    {
      id: 'news',
      title: 'Post Information',
      icon: <FaNewspaper />,
      description: 'Manage information, promotions, notifications, and news of the airline',
      color: '#3498db',
      component: NewsManagement
    },
    {
      id: 'aircraft',
      title: 'Manage Aircraft',
      icon: <FaPlane />,
      description: 'Input and manage information about aircraft',
      color: '#e74c3c',
      component: AircraftManagement
    },
    {
      id: 'flights',
      title: 'Manage Flights',
      icon: <FaRoute />,
      description: 'Manage information about flights',
      color: '#2ecc71',
      component: FlightManagement
    },
    {
      id: 'bookings',
      title: 'Booking Statistics',
      icon: <FaTicketAlt />,
      description: 'View and analyze customer booking statistics',
      color: '#f39c12',
      component: BookingStatistics
    },
    {
      id: 'delays',
      title: 'Manage Delays',
      icon: <FaClock />,
      description: 'Update departure times for flights',
      color: '#9b59b6',
      component: DelayManagement
    },
    {
      id: 'admin-accounts',
      title: 'Create Admin Account',
      icon: <FaUserPlus />,
      description: 'Create and manage admin accounts',
      color: '#e67e22',
      component: AdminAccountManagement
    }
  ];

  // Filter modules based on role
  const filteredModules = adminModules.filter(module => {
    console.log('userRole', userRole);
    if (module.id === 'admin-accounts') {
      return userRole === 'superadmin';
    }
    return true;
  });

  const renderModuleContent = () => {
    const selectedModuleData = adminModules.find(module => module.id === selectedModule);
    if (selectedModuleData) {
      const Component = selectedModuleData.component;
      return <Component />;
    }
    return null;
  };

  const handleLogout = async () => {
    try {
      await adminApi.logout();
      const Cookies = require('js-cookie');
      Cookies.remove('adminToken', { path: '/' });
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!isAuthenticated) {
    return null; // or loading spinner
  }

  return (
    <div className="adm-layout">
      <div className="adm-sidebar">
        <div className="adm-sidebar-header">
          <div className="adm-brand">
            <img src={logo} alt="Q-Airline Logo" className="adm-logo" />
            <div className="adm-brand-text"onClick={() => setSelectedModule(null)}
  style={{ cursor: 'pointer' }}>
              
              <span className="adm-brand-name">Q-AIRLINE</span>
              <span className="adm-brand-slogan">ADMINISTRATOR PANEL</span>
            </div>
          </div>
        </div>

        <div className="adm-menu">
          {filteredModules.map((module) => (
            <div
              key={module.id}
              className={`sidebar-item ${selectedModule === module.id ? 'active' : ''}`}
              onClick={() => setSelectedModule(module.id)}
            >
              <div className="sidebar-icon" style={{ color: module.color }}>
                {module.icon}
              </div>
              <span className="sidebar-text">{module.title}</span>
            </div>
          ))}
        </div>

        <div className="adm-sidebar-footer">
          <div className="adm-profile">
            <div className="adm-avatar">AD</div>
            <div className="adm-profile-info">
              <span className="adm-profile-name">Administrator</span>
              <span className="adm-profile-email">admin@qairline.com</span>
            </div>
          </div>
          <button onClick={handleLogout} className="adm-logout-btn">
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="adm-main">
        <div className="adm-content">
          {!selectedModule ? (
            <div className="adm-welcome-screen">
              <h2>Welcome to the Admin Panel</h2>
              <img src={welcomeImage} alt="Welcome" />
            </div>
          ) : (
            <div className="adm-content-area">
              {renderModuleContent()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
