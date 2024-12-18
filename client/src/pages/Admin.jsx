import React, { useState } from 'react';
import { FaNewspaper, FaPlane, FaRoute, FaTicketAlt, FaClock } from 'react-icons/fa';
import './Admin.css';
import welcomeImage from '../assets/images/admin-welcome.jpg';

const Admin = () => {
  const [selectedModule, setSelectedModule] = useState(null);

  const adminModules = [
    {
      id: 'news',
      title: 'Đăng thông tin',
      icon: <FaNewspaper />,
      description: 'Quản lý thông tin, khuyến mại, thông báo, tin tức của hãng',
      color: '#3498db'
    },
    {
      id: 'aircraft',
      title: 'Quản lý tàu bay',
      icon: <FaPlane />,
      description: 'Nhập và quản lý thông tin về các tàu bay',
      color: '#e74c3c'
    },
    {
      id: 'flights',
      title: 'Quản lý chuyến bay',
      icon: <FaRoute />,
      description: 'Quản lý thông tin các chuyến bay',
      color: '#2ecc71'
    },
    {
      id: 'bookings',
      title: 'Thống kê đặt vé',
      icon: <FaTicketAlt />,
      description: 'Xem và thống kê đặt vé của khách hàng',
      color: '#f39c12'
    },
    {
      id: 'delays',
      title: 'Quản lý delay',
      icon: <FaClock />,
      description: 'Cập nhật thời gian khởi hành cho các chuyến bay',
      color: '#9b59b6'
    }
  ];

  const renderModuleContent = () => {
    switch (selectedModule) {
      case 'news':
        return <NewsManagement />;
      case 'aircraft':
        return <AircraftManagement />;
      case 'flights':
        return <FlightManagement />;
      case 'bookings':
        return <BookingStatistics />;
      case 'delays':
        return <DelayManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        {adminModules.map((module) => (
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

      <div className="admin-main">
        {!selectedModule ? (
          <div className="welcome-screen">
            <img src={welcomeImage} alt="Welcome" />
            <h2>Chào mừng đến với trang quản trị</h2>
          </div>
        ) : (
          <div className="content-area">
            <h1 className="content-title">
              {adminModules.find(m => m.id === selectedModule)?.description}
            </h1>
            
            {renderModuleContent()}
          </div>
        )}
      </div>
    </div>
  );
};

const NewsManagement = () => (
  <div className="module-section">
    <div className="form-container">
      <div className="form-group">
        <label>Loại thông tin</label>
        <select>
          <option>Khuyến mại</option>
          <option>Thông báo</option>
          <option>Tin tức</option>
        </select>
      </div>
      <div className="form-group">
        <label>Thời gian đăng</label>
        <input type="datetime-local" />
      </div>
      <div className="form-group full-width">
        <label>Tiêu đề</label>
        <input type="text" placeholder="Nhập tiêu đề" />
      </div>
      <div className="form-group full-width">
        <label>Nội dung</label>
        <textarea rows="6" placeholder="Nhập nội dung"></textarea>
      </div>
      <button className="submit-button">Đăng thông tin</button>
    </div>
  </div>
);

const AircraftManagement = () => (
  <div className="module-section">
    <div className="form-container">
      <div className="form-group">
        <label>Mã tàu bay</label>
        <input type="text" placeholder="Nhập mã tàu bay" />
      </div>
      <div className="form-group">
        <label>Hãng sản xuất</label>
        <input type="text" placeholder="Nhập hãng sản xuất" />
      </div>
      <div className="form-group">
        <label>Số ghế hạng nhất</label>
        <input type="number" placeholder="Nhập số ghế" />
      </div>
      <div className="form-group">
        <label>Số ghế hạng thương gia</label>
        <input type="number" placeholder="Nhập số ghế" />
      </div>
      <div className="form-group">
        <label>Số ghế hạng phổ thông đặc biệt</label>
        <input type="number" placeholder="Nhập số ghế" />
      </div>
      <div className="form-group">
        <label>Số ghế hạng phổ thông</label>
        <input type="number" placeholder="Nhập số ghế" />
      </div>
      <button className="submit-button">Thêm tàu bay</button>
    </div>
  </div>
);

const FlightManagement = () => (
  <div className="module-section">
    <div className="form-container">
      <div className="form-group">
        <label>Số hiệu chuyến bay</label>
        <input type="text" placeholder="Nhập số hiệu" />
      </div>
      <div className="form-group">
        <label>Tàu bay</label>
        <select>
          <option>Chọn tàu bay</option>
        </select>
      </div>
      <div className="form-group">
        <label>Điểm khởi hành</label>
        <select>
          <option>Chọn điểm khởi hành</option>
        </select>
      </div>
      <div className="form-group">
        <label>Điểm đến</label>
        <select>
          <option>Chọn điểm đến</option>
        </select>
      </div>
      <div className="form-group">
        <label>Thời gian khởi hành</label>
        <input type="datetime-local" />
      </div>
      <div className="form-group">
        <label>Thời gian bay (phút)</label>
        <input type="number" placeholder="Nhập thời gian bay" />
      </div>
      <div className="form-group">
        <label>Giá vé hạng nhất</label>
        <input type="number" placeholder="Nhập giá vé" />
      </div>
      <div className="form-group">
        <label>Giá vé hạng thương gia</label>
        <input type="number" placeholder="Nhập giá vé" />
      </div>
      <div className="form-group">
        <label>Giá vé hạng phổ thông đặc biệt</label>
        <input type="number" placeholder="Nhập giá vé" />
      </div>
      <div className="form-group">
        <label>Giá vé hạng phổ thông</label>
        <input type="number" placeholder="Nhập giá vé" />
      </div>
      <button className="submit-button">Thêm chuyến bay</button>
    </div>
  </div>
);

const BookingStatistics = () => (
  <div className="module-section">
    <h2>Thống kê đặt vé</h2>
    <div className="statistics-container">
      <div className="statistics-filters">
        <div className="form-group">
          <label>Từ ngày</label>
          <input type="date" />
        </div>
        <div className="form-group">
          <label>Đến ngày</label>
          <input type="date" />
        </div>
        <button className="submit-button">Xem thống kê</button>
      </div>
      <div className="statistics-table">
        {/* Bảng thống kê sẽ được thêm vào đây */}
      </div>
    </div>
  </div>
);

const DelayManagement = () => (
  <div className="module-section">
    <h2>Quản lý delay</h2>
    <div className="form-container">
      <div className="form-group">
        <label>Chuyến bay</label>
        <select>
          <option>Chọn chuyến bay</option>
        </select>
      </div>
      <div className="form-group">
        <label>Thời gian delay</label>
        <input type="time" />
      </div>
      <div className="form-group">
        <label>Lý do</label>
        <textarea rows="4" placeholder="Nhập lý do delay"></textarea>
      </div>
      <button className="submit-button">Cập nhật</button>
    </div>
  </div>
);

export default Admin;
