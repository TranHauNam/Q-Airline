import React, { useState } from 'react';
//import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //const response = await axios.post('http://localhost:5000/api/user/login', credentials);
            navigate('/');
        } catch (err) {
            setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
        }
    };

    return (
        <div className="login-page">
            <div className="login-box">
                <div className="login-header">
                    <h2>Đăng Nhập</h2>
                    <p>Chào mừng bạn quay trở lại!</p>
                </div>
                
                {error && <div className="error-message">{error}</div>}
                
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            placeholder="Nhập email của bạn"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Mật khẩu</label>
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            placeholder="Nhập mật khẩu"
                            required
                        />
                    </div>
                    
                    <button type="submit" className="login-button">
                        Đăng nhập
                    </button>
                    
                    <div className="additional-links">
                        <a href="/forgot-password">Quên mật khẩu?</a>
                        <a href="/register">Đăng ký tài khoản mới</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;