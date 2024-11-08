import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
            console.log('Register response:', response.data); // Thêm log để debug
            navigate('/user/login');
        } catch (err) {
            console.error('Register error:', err); // Thêm log để debug
            if (err.response) {
                // Lỗi từ server (400, 401, 403, 500, etc.)
                setError(err.response.data.message);
            } else if (err.request) {
                // Lỗi không có response (network error)
                setError('Không thể kết nối đến server');
            } else {
                // Lỗi khác
                setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
            }
        }
    };  

    return (
        <div className="register-container">
            <h2>Đăng ký</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Họ tên:</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Mật khẩu:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Xác nhận mật khẩu:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Đăng ký</button>
            </form>
        </div>
    );
};

export default Register;