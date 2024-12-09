import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/user/login');
    };

    const handleRegisterClick = () => {
        navigate('/user/register');
    };

    return (
        <div className="home-container">
            <div className="hero-section">
                <div className="content-wrapper">
                    <h1>Chào mừng đến với Q-Airline</h1>
                    <p className="subtitle">Khám phá trải nghiệm bay tuyệt vời cùng chúng tôi</p>
                    
                    <div className="features">
                        <div className="feature-item">
                            <i className="fas fa-plane"></i>
                            <span>Đặt vé dễ dàng</span>
                        </div>
                        <div className="feature-item">
                            <i className="fas fa-clock"></i>
                            <span>Tiết kiệm thời gian</span>
                        </div>
                        <div className="feature-item">
                            <i className="fas fa-tag"></i>
                            <span>Giá cả hợp lý</span>
                        </div>
                    </div>

                    <div className="auth-buttons">
                        <button className="btn-primary" onClick={handleLoginClick}>
                            Đăng nhập
                        </button>
                        <button className="btn-secondary" onClick={handleRegisterClick}>
                            Đăng ký
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;