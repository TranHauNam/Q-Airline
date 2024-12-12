import React, { useState } from 'react';
import Navbar from '../components/home-components/Navbar';
import './SearchPage.css';

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
      <Navbar />
      <div className="flight-results">
        <div className="flight-header">
          <div className="route-info">
            <div className="cities">
              <span className="city">AMS</span>
              <span className="arrow">→</span>
              <span className="city">ATQ</span>
            </div>
            <div className="date-info">
              SUN, 15 DEC 24
            </div>
          </div>
          <button className="modify-btn">Modify Booking</button>
        </div>

        <div className="date-navigation">
          <button className="nav-btn prev">←</button>
          <div className="date-options">
            {[...Array(7)].map((_, index) => (
              <div className={`date-option ${index === 3 ? 'selected' : ''}`} key={index}>
                <div className="day">SUN, 15 DEC</div>
                <div className="price">EUR 761.69</div>
              </div>
            ))}
          </div>
          <button className="nav-btn next">→</button>
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
          {[1, 2].map((flight) => (
            <div className="flight-card" key={flight}>
              <div className="flight-info">
                <div className="airline-details">
                  <div className="flight-numbers">AI 156 + AI 491</div>
                  <div className="flight-times">
                    <div className="departure">
                      <div className="time">20:35</div>
                      <div className="city">AMS</div>
                    </div>
                    <div className="duration">
                      <div className="line"></div>
                      <div className="time">11H 10Min</div>
                      <div className="stops">1 Stop DEL</div>
                    </div>
                    <div className="arrival">
                      <div className="time">12:15</div>
                      <div className="city">ATQ</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="price-section">
                <div className="fare-options">
                  <div className="fare-type economy">
                    <div className="label">ECONOMY</div>
                    <div className="price">EUR 761.69</div>
                    <div className="seats">3 seats left at this fare</div>
                  </div>
                  <div className="fare-type business">
                    <div className="label">BUSINESS</div>
                    <div className="price">EUR 2,236.33</div>
                    <div className="seats">2 seats left at this fare</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
