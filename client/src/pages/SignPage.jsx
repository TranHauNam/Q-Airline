import "./SignPage.css";
import image from "../assets/images/background.jpg";

import React, { useState } from "react";

const SignPage = () => {
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
            <form class="form" action="#">
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
              <span>or use your email for registration</span>
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button class="sign-btn">Sign Up</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form class="form" action="#">
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
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
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
