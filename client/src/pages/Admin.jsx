import React, { useState, useEffect } from 'react';
import { FaNewspaper, FaPlane, FaRoute, FaTicketAlt, FaClock, FaUserPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../services/modules/admin/admin.api';
import './Admin.css';
import welcomeImage from '../assets/images/admin-welcome.jpg';

// Import các components
import NewsManagement from '../components/admin/NewsManagement';
import AircraftManagement from '../components/admin/AircraftManagement';
import FlightManagement from '../components/admin/FlightManagement';
import BookingStatistics from '../components/admin/BookingStatistics';
import DelayManagement from '../components/admin/DelayManagement';
import AdminHeader from '../components/admin/AdminHeader';
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
          setIsAuthenticated(true);
          setUserRole(response.data.admin.role);
        } else {
          navigate('/loginadmin');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        navigate('/loginadmin');
      }
    };
    checkAuth();
  }, [navigate]);

  const adminModules = [
    {
      id: 'news',
      title: 'Đăng thông tin',
      icon: <FaNewspaper />,
      description: 'Quản lý thông tin, khuyến mại, thông báo, tin tức của hãng',

      color: '#3498db',
      component: NewsManagement
    },
    {
      id: 'aircraft',
      title: 'Quản lý tàu bay',
      icon: <FaPlane />,
      description: 'Nhập và quản lý thông tin về các tàu bay',

      color: '#e74c3c',
      component: AircraftManagement

    },
    {
      id: 'flights',
      title: 'Quản lý chuyến bay',
      icon: <FaRoute />,
      description: 'Quản lý thông tin các chuyến bay',

      color: '#2ecc71',
      component: FlightManagement

    },
    {
      id: 'bookings',
      title: 'Thống kê đặt vé',
      icon: <FaTicketAlt />,
      description: 'Xem và thống kê đặt vé của khách hàng',

      color: '#f39c12',
      component: BookingStatistics

    },
    {
      id: 'delays',
      title: 'Quản lý delay',
      icon: <FaClock />,
      description: 'Cập nhật thời gian khởi hành cho các chuyến bay',

      color: '#9b59b6',
      component: DelayManagement

    },
    {
      id: 'admin-accounts',
      title: 'Tạo tài khoản Admin',
      icon: <FaUserPlus />,
      description: 'Tạo và quản lý tài khoản admin',
      color: '#e67e22',
      component: AdminAccountManagement
    }
  ];

  // Lọc modules dựa trên role
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
    return null; // hoặc loading spinner
  }

  return (
    <div className="adm-layout">
      <AdminHeader onLogout={handleLogout} />
      <div className="adm-sidebar">
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
      </div>

      <div className="adm-main">
        <div className="adm-content">
          {!selectedModule ? (
            <div className="adm-welcome-screen">
              <h2>Chào mừng đến với trang quản trị</h2>
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
