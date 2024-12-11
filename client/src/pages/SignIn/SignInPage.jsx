import React from "react";
import "./SignIn.css";

const SignInPage = () => {
    return (
      <div className="signin-container">
        {/* Bên trái */}
        <div className="signin-left">
          <h2>SIGN IN</h2>
          <form>
            <div className="form-group">
              <input type="text" placeholder="  example@gmail.com" required />
            </div>
            <button type="submit" className="btn btn-primary">
              Sign In With Email OTP
            </button>
            <div className="divider">OR</div>
            <button type="button" className="btn btn-secondary">
              Sign In with OTP
            </button>
          </form>
          <p>
            <small>For minor accounts, sign in only with Email</small>
          </p>
          <a href="#">Having trouble? Contact us</a>
        </div>
  
        {/* Bên phải */}
        <div className="signin-right">
          <h3>SIGN UP FOR Q-AIRLINE</h3>
          <ul>
            <li>Earn 1000 bonus Q-Airline Points</li>
            <li>
              Get Q-Airline Points when you fly with Air India and our 24 Star Alliance Airline Partners
            </li>
            <li>Earn points with our Maharaja Club partners</li>
            <li>Redeem Maharaja Points for flights and upgrades</li>
            
          </ul>
          <button className="btn btn-outline">Sign Up</button>
          <p className="note">*T&C Apply</p>
        </div>
      </div>
    );
  };
  
export default SignInPage;