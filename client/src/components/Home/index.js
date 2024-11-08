import React from 'react';
import { useNavigate } from 'react-router-dom';
//import './styles.css';

const Home = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/user/login');
    };

    const handleRegisterClick = () => {
        navigate('/user/register');
    };

    return (
        <div className="container">
            <div className="welcome-section">
                <h1>Chào mừng đến với ứng dụng</h1>
                <div className="auth-buttons">
                    <button onClick={handleLoginClick}>Đăng nhập</button>
                    <button onClick={handleRegisterClick}>Đăng ký</button>
                </div>
            </div>
        </div>
    );
};

export default Home;