import React from "react";
import "./Navbar.css";
import logo from '../../assets/logo192.png';
import { FaSignInAlt } from "react-icons/fa";

const Navbar = () => {
  return (
    <div class="navbar">
      {/* Logo Section */}
      <div className="navbar-logo">
        <h1>
          <a href="/">
            <img src={logo} alt="Capyod Logo" className="h-6 w-6" />
          </a>
          <a href="/">
            <span className="text-[#000000]">Q-AIRLINE</span>
          </a>
        </h1>
      </div>

      <div className="dropdown">
        <a href="/login">
          <button className="login-btn">
            <FaSignInAlt style={{ marginRight: '0px' }} /> {/* Add icon */}
            SIGN IN
          </button>
        </a>
      </div>

      <div class="dropdown">
        <button class="dropbtn">Q AIRLINE EXPERIENCE</button>
        <div class="dropdown-content">
          {/* <div class="row"> */}
            <div class="column">
              <h3>Q AIRLINE EXPERIENCE</h3>
              <ul>
              <li>
                <a href="#">Search Flights</a>
              </li>
              <li>
                <a href="#">Fare Lock</a>
              </li>
              <li>
                <a href="#">Corporate Travel Programme</a>
              </li>
              <li>
                <a href="#">Group Booking</a>
              </li>
              <li>
                <a href="#">Special Offers</a>
              </li>
            </ul>
            </div>
            <div class="column">
              <a href="/login"> 
                <img src={logo} alt="Hình ảnh có thể nhấp"/> 
                <div class="bottom-left">Bottom Left</div>
              </a>
            </div>
            <div class="column">
              <a href="/login"> 
                <img src={logo} alt="Hình ảnh có thể nhấp"/> 
              </a>
            </div>
          {/* </div> */}
        </div>
      </div>

      
      <div class="dropdown">
        <button class="dropbtn">PREPARE TO TRAVEL</button>
        <div class="dropdown-content">
          {/* <div class="row"> */}
            <div class="column">
              <h3>PREPARE TO TRAVEL</h3>
              <ul>
              <li>
                <a href="#">Search Flights</a>
              </li>
              <li>
                <a href="#">Fare Lock</a>
              </li>
              <li>
                <a href="#">Corporate Travel Programme</a>
              </li>
              <li>
                <a href="#">Group Booking</a>
              </li>
              <li>
                <a href="#">Special Offers</a>
              </li>
            </ul>
            </div>
          {/* </div> */}
        </div>
      </div>

      <div class="dropdown">
        <button class="dropbtn">WHERE WE FLY</button>
        <div class="dropdown-content">
          {/* <div class="row"> */}
            <div class="column">
              <h3>Where we fly</h3>
              <ul>
              <li>
                <a href="#">Search Flights</a>
              </li>
              <li>
                <a href="#">Fare Lock</a>
              </li>
              <li>
                <a href="#">Corporate Travel Programme</a>
              </li>
              <li>
                <a href="#">Group Booking</a>
              </li>
              <li>
                <a href="#">Special Offers</a>
              </li>
            </ul>
            </div>
            <div class="column">
              <a href="/login"> 
                <img src={logo} alt="Hình ảnh có thể nhấp"/> 
                <div class="bottom-left">Bottom Left</div>
              </a>
            </div>
            <div class="column">
              <a href="/login"> 
                <img src={logo} alt="Hình ảnh có thể nhấp"/> 
              </a>
            </div>
          {/* </div> */}
        </div>
      </div>


      <div class="dropdown">
        <button class="dropbtn">BOOK AND MANAGE</button>
        <div class="dropdown-content">
          {/* <div class="row"> */}
          <div class="column">
            <h3>BOOK</h3>
            <ul>
              <li>
                <a href="#">Search Flights</a>
              </li>
              <li>
                <a href="#">Fare Lock</a>
              </li>
              <li>
                <a href="#">Corporate Travel Programme</a>
              </li>
              <li>
                <a href="#">Group Booking</a>
              </li>
              <li>
                <a href="#">Special Offers</a>
              </li>
            </ul>
          </div>
          <div class="column">
            <h3>MANAGE</h3>
            <ul>
              <li>
                <a href="#">Check In Online</a>
              </li>
              <li>
                <a href="#">Manage Booking</a>
              </li>
              <li>
                <a href="#">Seat Selection & Upgrades</a>
              </li>
              <li>
                <a href="#">Self-Service Re-accommodation</a>
              </li>
              <li>
                <a href="#">Request Refund</a>
              </li>
            </ul>
          </div>
          <div class="column">
            <h3>MANAGE</h3>
            <ul>
              <li>
                <a href="#">Check In Online</a>
              </li>
              <li>
                <a href="#">Manage Booking</a>
              </li>
              <li>
                <a href="#">Seat Selection & Upgrades</a>
              </li>
              <li>
                <a href="#">Self-Service Re-accommodation</a>
              </li>
              <li>
                <a href="#">Request Refund</a>
              </li>
            </ul>
          </div>
          {/* </div> */}
        </div>
      </div>
      
    </div>
  );
};

export default Navbar;
