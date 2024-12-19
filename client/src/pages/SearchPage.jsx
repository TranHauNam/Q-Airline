import React, { useState } from 'react';


import { FaPlane, FaCalendarAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import Header from '../components/common/Header'

import './SearchPage.css';

const flightData = [
  {
    airline: 'JetStar',
    flightNumber: 'BL788',
    departureTime: '20:25',
    arrivalTime: '22:30',
    departureCity: 'CL (Chu Lai)',
    arrivalCity: 'HN (HaNoi)',
    duration: '114 phút',
    price: '1020568 VND',
    logo: '/path/to/jetstar-logo.png'
  },
  {
    airline: 'VietJet',
    flightNumber: 'BL788',
    departureTime: '20:25',
    arrivalTime: '22:30',
    departureCity: 'CL (Chu Lai)',
    arrivalCity: 'HN (HaNoi)',
    duration: '114 phút',
    price: '1020568 VND',
    logo: '/path/to/vietjet-logo.png'
  },
  {
    airline: 'VietnamAirline',
    flightNumber: 'BL788',
    departureTime: '20:25',
    arrivalTime: '22:30',
    departureCity: 'CL (Chu Lai)',
    arrivalCity: 'HN (HaNoi)',
    duration: '114 phút',
    price: '1020568 VND',
    logo: '/path/to/vietnam-airline-logo.png'
  }
];

const SearchPage = () => {
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    passengers: 1,
    class: 'economy'
  });

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search params:', searchParams);
  };

  return (
    <div className="search-page">
      <Header />
      <div className="flight-results">
        <div className="flight-header">
          <div className="route-info">
            <div className="cities">
              <span className="city">AMS</span>
              <span className="arrow">
                <FaPlane />
              </span>
              <span className="city">ATQ</span>
            </div>
            <div className="date-info">
              <FaCalendarAlt style={{ marginRight: '8px' }} />
              Chủ nhật, 15 tháng 12, 2024
            </div>
            <button className="modify-btn">
            Thay đổi tìm kiếm
          </button>
          </div>
          
        </div>

        <div className="date-navigation">
          <button className="nav-btn prev">
            <FaChevronLeft />
          </button>
          <div className="date-options">
            {[...Array(7)].map((_, index) => (
              <div className={`date-option ${index === 3 ? 'selected' : ''}`} key={index}>
                <div className="day">SUN, 15 DEC</div>
                <div className="price">EUR 761.69</div>
              </div>
            ))}
          </div>
          <button className="nav-btn next">
            <FaChevronRight />
          </button>
        </div>

        <div className="flight-filters">
          <div className="filter-group">
            <label>Duration</label>
            <select>
              <option>All</option>
              <option>Under 15h</option>
              <option>15h - 20h</option>
              <option>Over 20h</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Filter</label>
            <select>
              <option>All Flights</option>
              <option>Direct Flights</option>
              <option>1 Stop</option>
            </select>
          </div>
        </div>

        <div className="flight-list">
          {flightData.map((flight, index) => (
            <div className="flight-card" key={index}>
              <div className="flight-info">
                <img 
                  src={flight.logo} 
                  alt={flight.airline} 
                  className="airline-logo"
                />
                <div className="flight-number">
                  {flight.flightNumber}
                </div>
                <div className="flight-details">
                  <div className="departure">
                    <div className="flight-time">{flight.departureTime}</div>
                    <div className="flight-city">{flight.departureCity}</div>
                  </div>
                  <div className="duration-info">
                    <span>Bay thẳng</span>
                    <div>{flight.duration}</div>
                  </div>
                  <div className="arrival">
                    <div className="flight-time">{flight.arrivalTime}</div>
                    <div className="flight-city">{flight.arrivalCity}</div>
                  </div>
                </div>
              </div>
              <div className="price-section">
                <div className="price">{flight.price}</div>
                <button className="select-button">CHỌN</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;