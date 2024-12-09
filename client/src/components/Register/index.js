import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu không khớp');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:5000/api/user/register', {
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password
            });
            navigate('/');
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message);
            } else if (err.request) {
                setError('Không thể kết nối đến server');
            } else {
                setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
            }
        }
    };  

    return (
        <div className="register-page">
            <div className="register-box">
                <div className="register-header">
                    <h2>Đăng Ký Tài Khoản</h2>
                    <p>Tham gia cùng Q-Airline ngay hôm nay!</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="register-form">
                    <div className="form-group">
                        <label>
                            <i className="fas fa-user"></i>
                            Họ tên
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Nhập họ tên của bạn"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            <i className="fas fa-envelope"></i>
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Nhập email của bạn"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            <i className="fas fa-lock"></i>
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Nhập mật khẩu"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            <i className="fas fa-lock"></i>
                            Xác nhận mật khẩu
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Xác nhận mật khẩu"
                            required
                        />
                    </div>

                    <button type="submit" className="register-button">
                        Đăng ký
                    </button>

                    <div className="login-link">
                        Đã có tài khoản? <a href="/user/login">Đăng nhập ngay</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;