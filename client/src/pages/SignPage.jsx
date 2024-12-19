import "./SignPage.css";
import image from "../assets/images/background.jpg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import accountService from '../services/modules/user/account';

const SignPage = () => {
  const navigate = useNavigate();

  const [formDataSignIn, setFormDataSignIn] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangeSignIn = (e) => {
    setFormDataSignIn({
      ...formDataSignIn,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await accountService.login(formDataSignIn);
      
      if (response.token) {
        // Đăng nhập thành công
        window.location.href = '/';
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
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
  navigate('/forgot-password');
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
    setLoading(true);

    // Kiểm tra mật khẩu xác nhận
    if (formDataSignUp.password !== formDataSignUp.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      setLoading(false);
      return;
    }

    try {
      const response = await accountService.register({
        fullName: formDataSignUp.fullName,
        email: formDataSignUp.email,
        password: formDataSignUp.password
      });

      if (response.token) {
        // Đăng ký thành công và tự động đăng nhập
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
    } finally {
      setLoading(false);
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
    <div className="sp-wrap">
      <div>
        <div
          className={`sp-container ${
            isRightPanelActive ? "right-panel-active" : ""
          }`}
          id="container"
        >
          <div className="sp-form-container sp-sign-up-container">
            <form className="sp-form" onSubmit={handleSubmitSignUp}>
              <h1 className="sp-h1">Create Account</h1>
              <div className="sp-social-container">
                <a class="sp-a" href="#" className="social">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a class="sp-a" href="#" className="social">
                  <i className="fab fa-google-plus-g"></i>
                </a>
                <a class="sp-a" href="#" className="social">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <input type="text" placeholder="Name" name="fullName"
              value={formDataSignUp.fullName}
              onChange={handleChangeSignUp}
              disabled={loading}
              required/>
              <input type="email" placeholder="Email" name="email"
              value={formDataSignUp.email}
              onChange={handleChangeSignUp}
              disabled={loading}
              required/>
              <input type="password" placeholder="Password" name="password"
              value={formDataSignUp.password}
              onChange={handleChangeSignUp}
              disabled={loading}
              required/>
              <input type="password" placeholder="Confirm Password" name="confirmPassword"
              value={formDataSignUp.confirmPassword}
              onChange={handleChangeSignUp}
              disabled={loading}
              required/>
              {error && <div className="error-message">{error}</div>}
              <button class="sp-sign-btn" disabled={loading}>
                {loading ? 'Đang đăng ký...' : 'Đăng Ký'}
              </button>
            </form>
          </div>
          <div className="sp-form-container sp-sign-in-container">
            <form className="sp-form" onSubmit={handleSubmitSignIn}>
              <h1 className="sp-h1">Sign in</h1>
              <div className="sp-social-container">
                <a class="sp-a" href="#" className="social">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a class="sp-a" href="#" className="social">
                  <i className="fab fa-google-plus-g"></i>
                </a>
                <a class="sp-a" href="#" className="social">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <span>or use your account</span>
              <input type="email" placeholder="Email" name="email"
              value={formDataSignIn.email}
              onChange={handleChangeSignIn}
              disabled={loading}
              required/>
              <input type="password" placeholder="Password" name="password"
              value={formDataSignIn.password}
              onChange={handleChangeSignIn}
              disabled={loading}
              required/>
              {error && <div className="error-message">{error}</div>}
              <a class="sp-a" href="#" onClick={handleForgotPassword}>
                Forgot your password?
              </a>
              <button class="sp-sign-btn" disabled={loading}>
                {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </button>
            </form>
          </div>
          <div className="sp-overlay-container">
            <div className="sp-overlay">
              <div className="sp-overlay-panel sp-overlay-left">
                <h1 class="sp-h1">Welcome Back!</h1>
                <p class="sp-p">
                  To keep connected with us please login with your personal info
                </p>
                <button
                  class="sp-sign-btn"
                  className="ghost"
                  id="signIn"
                  onClick={handleSignInClick}
                >
                  Sign In
                </button>
              </div>
              <div className="sp-overlay-panel sp-overlay-right">
                <h1 class="sp-h1">Hello, Friend!</h1>
                <p class="sp-p">
                  Enter your personal details and start journey with us
                </p>
                <button
                  class="sp-sign-btn"
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
