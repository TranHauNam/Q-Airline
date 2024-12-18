import "./SignPage.css";
import image from "../assets/images/background.jpg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";

const SignPage = () => {
  const navigate = useNavigate();

  const [formDataSignIn, setFormDataSignIn] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChangeSignIn = (e) => {
    setFormDataSignIn({
      ...formDataSignIn,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitSignIn = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Cấu hình axios cho backend port 5000
      axios.defaults.baseURL = 'http://localhost:5000';
      axios.defaults.withCredentials = true;

      const response = await axios.post('/api/user/login', formDataSignIn);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        navigate('/');
      } else {
        setError('Đăng nhập không thành công');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        setError(error.response.data.message || 'Đăng nhập thất bại');
      } else if (error.request) {
        setError('Không thể kết nối đến server');
      } else {
        setError('Có lỗi xảy ra, vui lòng thử lại');
      }
    }
  };

  // Sign Up Form
  const [formDataSignUp, setFormDataSignUp] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChangeSignUp = (e) => {
    setFormDataSignUp({
      ...formDataSignUp,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    setError('');

    // Kiểm tra mật khẩu xác nhận
    if (formDataSignUp.password !== formDataSignUp.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    try {
      axios.defaults.baseURL = 'http://localhost:5000';
      axios.defaults.withCredentials = true;

      const response = await axios.post('/api/user/register', {
        fullName: formDataSignUp.fullName,
        email: formDataSignUp.email,
        password: formDataSignUp.password
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        navigate('/');
      } else {
        setError('Đăng ký không thành công');
      }
    } catch (error) {
      console.error('Register error:', error);
      if (error.response) {
        setError(error.response.data.message || 'Đăng ký thất bại');
      } else if (error.request) {
        setError('Không thể kết nối đến server');
      } else {
        setError('Có lỗi xảy ra, vui lòng thử lại');
      }
    }
  };




  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  return (
    <div class="wrap">
      <div>
        <div
          className={`container ${
            isRightPanelActive ? "right-panel-active" : ""
          }`}
          id="container"
        >
          <div className="form-container sign-up-container">
            <form class="form" onSubmit={handleSubmitSignUp}>
              <h1 class="h1">Create Account</h1>
              <div className="social-container">
                <a class="a" href="#" className="social">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a class="a" href="#" className="social">
                  <i className="fab fa-google-plus-g"></i>
                </a>
                <a class="a" href="#" className="social">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <input type="text" placeholder="Name" name="fullName"
              value={formDataSignUp.fullName}
              onChange={handleChangeSignUp}
              required/>
              <input type="email" placeholder="Email" name="email"
              value={formDataSignUp.email}
              onChange={handleChangeSignUp}
              required/>
              <input type="password" placeholder="Password" name="password"
              value={formDataSignUp.password}
              onChange={handleChangeSignUp}
              required/>
              <input type="password" placeholder="Confirm Password" name="confirmPassword"
              value={formDataSignUp.confirmPassword}
              onChange={handleChangeSignUp}
              required/>
              {error && <div className="error-message">{error}</div>}
              <button class="sign-btn">Sign Up</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form class="form" onSubmit={handleSubmitSignIn}>
              <h1 class="h1">Sign in</h1>
              <div className="social-container">
                <a class="a" href="#" className="social">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a class="a" href="#" className="social">
                  <i className="fab fa-google-plus-g"></i>
                </a>
                <a class="a" href="#" className="social">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <span>or use your account</span>
              <input type="email" placeholder="Email" name="email"
              value={formDataSignIn.email}
              onChange={handleChangeSignIn}
              required/>
              <input type="password" placeholder="Password" name="password"
              value={formDataSignIn.password}
              onChange={handleChangeSignIn}
              required/>
              {error && <div className="error-message">{error}</div>}
              <a class="a" href="#">
                Forgot your password?
              </a>
              <button class="sign-btn">Sign In</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 class="h1">Welcome Back!</h1>
                <p class="p">
                  To keep connected with us please login with your personal info
                </p>
                <button
                  class="sign-btn"
                  className="ghost"
                  id="signIn"
                  onClick={handleSignInClick}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 class="h1">Hello, Friend!</h1>
                <p class="p">
                  Enter your personal details and start journey with us
                </p>
                <button
                  class="sign-btn"
                  className="ghost"
                  id="signUp"
                  onClick={handleSignUpClick}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignPage;
