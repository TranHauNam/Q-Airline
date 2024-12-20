import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import image1 from '../../assets/images/image1.jpg';
import logo from '../../assets/logo192.png';
import accountService from '../../services/modules/user/account';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await accountService.getCurrentUser();
      setUser(currentUser);
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await accountService.logout();
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const toggleMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <div className="mega-menu-wrapper">
      {/* Top Bar */}
      <div className="topbar">
        <div className="topbar-container">
          <div className="topbar-links">
            <Link to="/" className="topbar-link">
              <svg xmlns="http://www.w3.org/2000/svg" className="topbar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              TARIFF
            </Link>
            <Link to="/" className="topbar-link">
              <svg xmlns="http://www.w3.org/2000/svg" className="topbar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
              GIFT CARDS
            </Link>
            <Link to="/" className="topbar-link">
              <svg xmlns="http://www.w3.org/2000/svg" className="topbar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              SEARCH
            </Link>
            <Link to="/" className="topbar-link">
              <svg xmlns="http://www.w3.org/2000/svg" className="topbar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              SUPPORT
            </Link>
            {user ? (
              <div className={`profile-wrapper ${showProfileMenu ? 'active' : ''}`}>
                <div 
                  className="profile-trigger"
                  onClick={toggleMenu}
                >
                  <div className="profile-avatar">
                  {getInitials(user.fullName)}
                  </div>
                  <div className="profile-icon">
                    <i className="fas fa-chevron-down"></i>
                  </div>
                  <div className="profile-status"></div>
                </div>
                {showProfileMenu && (
                  <div className="profile-menu">
                    <div className="profile-info">
                      <span className="user-name">{user.fullName}</span>
                      <span className="user-email">{user.email}</span>
                    </div>
                    <div className="menu-items">
                      <Link to="/profile" className="menu-item">
                        <i className="fas fa-user"></i>
                        Thông tin cá nhân
                      </Link>
                      <Link to="/orders" className="menu-item">
                        <i className="fas fa-shopping-bag"></i>
                        Đơn hàng
                      </Link>
                      <Link to="/settings" className="menu-item">
                        <i className="fas fa-cog"></i>
                        Cài đặt
                      </Link>
                      <button onClick={handleLogout} className="menu-item logout">
                        <i className="fas fa-sign-out-alt"></i>
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/sign" className="topbar-link">
                <svg xmlns="http://www.w3.org/2000/svg" className="topbar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                SIGN IN
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Existing Navbar */}
      <div className="navbar">
        <div className="navbar-brand">
          <a href="/">
            <img src={logo} alt="Q-Airline Logo" />
            <div className="brand-name">
              <span className="brand-text">Q-AIRLINE</span>
              <span className="brand-slogan">THE PALACE IN THE SKY</span>
            </div>
          </a>
        </div>

        <div className="navbar-menu">
          <div className="dropdown">
            <button className="dropbtn">
              BOOK & MANAGE
            </button>
            <div className="dropdown-content">
              <div className="row">
                <div className="column">
                  <h3>BOOK</h3>
                  <a href="#">Search Flights</a>
                  <a href="#">Fare Lock</a>
                  <a href="#">Corporate Travel Programme</a>
                  <a href="#">Group Booking</a>
                  <a href="#">Exclusive Deals</a>
                </div>
                <div className="column">
                  <h3>ADDITIONAL SERVICES</h3>
                  <a href="#">Gift Cards</a>
                  <a href="#">Travel Insurance</a>
                  <a href="#">E-Store</a>
                  <a href="#">Cargo</a>
                  <a href="#">Flight Schedule</a>
                </div>
                <div className="column">
                  <h3>MANAGE</h3>
                  <a href="#">Check In Online</a>
                  <a href="#">Manage Booking</a>
                  <a href="#">Seat Selection & Upgrades</a>
                  <a href="#">Self-Service Re-accommodation</a>
                  <a href="#">Request Refund</a>
                </div>
                <div className="column">
                  <h3>TRACK</h3>
                  <a href="#">Flight Status</a>
                  <a href="#">Track Your Bags</a>
                  <a href="#">Fog Care</a>
                  <a href="#">Fly Prior</a>
                </div>
              </div>
            </div>
          </div>

          <div className="dropdown">
            <button className="dropbtn">
              WHERE WE FLY
            </button>
            <div className="dropdown-content">
              <div className="row">
                <div className="column">
                  <h3>DESTINATIONS</h3>
                  <a href="#">Route Map</a>
                  <a href="#">Nonstop International Flights</a>
                  <a href="#">Popular Flights</a>
                  <a href="#">Partner Airlines</a>
                </div>
                <div className="column featured-destinations">
                  <div className="destination-card">
                    <img src={image1} alt="New York City" />
                    <div className="destination-info">
                      <p>Fly nonstop to</p>
                      <h3>NEW YORK CITY</h3>
                      <button>Book Now →</button>
                    </div>
                  </div>
                </div>
                <div className="column featured-destinations">
                  <div className="destination-card">
                    <img src={image1} alt="London" />
                    <div className="destination-info">
                      <p>DEL - LHR</p>
                      <h3>DELHI TO LONDON</h3>
                      <button>Book Now →</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="dropdown">
            <button className="dropbtn">
              PREPARE TO TRAVEL
            </button>
            <div className="dropdown-content">
              <div className="row">
                <div className="column">
                  <h3>TRAVEL INFORMATION</h3>
                  <a href="#">Baggage Guidelines</a>
                  <a href="#">Airport Information</a>
                  <a href="#">Visas, Documents and Travel Tips</a>
                  <a href="#">First-time Travellers, Children and Pets</a>
                  <a href="#">Health and Medical Assistance</a>
                </div>
                <div className="column featured-services">
                  <div className="service-card">
                    <img src={image1} alt="Excess Baggage" />
                    <div className="service-info">
                      <p>Lots of luggage?</p>
                      <h3>PREPAY FOR EXCESS BAGGAGE</h3>
                      <button>Learn More →</button>
                    </div>
                  </div>
                </div>
                <div className="column featured-services">
                  <div className="service-card">
                    <img src={image1} alt="Tours & Activities" />
                    <div className="service-info">
                      <h3>TOURS & ACTIVITIES</h3>
                      <button>Book Now →</button>
                    </div>
                  </div>
                </div>
                <div className="column featured-services">
                  <div className="service-card">
                    <img src={image1} alt="Visa Services" />
                    <div className="service-info">
                      <p>Planning a vacation?</p>
                      <h3>HASSLE-FREE VISA WITH ONEVASCO</h3>
                      <button>Learn More →</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="dropdown">
            <button className="dropbtn">
              Q-AIRLINE EXPERIENCE
            </button>
            <div className="dropdown-content">
              <div className="row">
                <div className="column">
                  <h3>YOUR JOURNEY</h3>
                  <a href="#">At the Airport</a>
                  <a href="#">In the Air</a>
                  <a href="#">Transforming Experiences</a>
                  <a href="#">The Q-Airline Fleet</a>
                </div>
                <div className="column featured-experiences">
                  <div className="experience-card">
                    <img src={image1} alt="Premium Economy" />
                    <div className="experience-info">
                      <p>Premium Economy</p>
                      <h3>MORE SPACE, FASTER CHECK-IN</h3>
                      <button>Learn More →</button>
                    </div>
                  </div>
                </div>
                <div className="column featured-experiences">
                  <div className="experience-card">
                    <img src={image1} alt="Gift Cards" />
                    <div className="experience-info">
                      <p>Gift them the love of travel</p>
                      <h3>INTRODUCING Q-AIRLINE'S GIFT CARDS</h3>
                      <button>Buy Now →</button>
                    </div>
                  </div>
                </div>
                <div className="column featured-experiences">
                  <div className="experience-card">
                    <img src={image1} alt="Airport Transfers" />
                    <div className="experience-info">
                      <p>On time, every time,</p>
                      <h3>AIRPORT TRANSFERS MADE EASY</h3>
                      <button>Book A Cab →</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="dropdown">
            <button className="dropbtn">
              Q-AIRLINE CLUB
            </button>
            <div className="dropdown-content">
              {/* Add Maharaja Club content here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header; 